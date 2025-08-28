import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Package, MapPin, Clock, User, Hash, ExternalLink } from 'lucide-react';
import { getProductFromBlockchain, SupplyChainProduct } from '@/utils/blockchain';
import { toast } from 'sonner';

const TrackProduct = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<SupplyChainProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (productId) {
      loadProduct(productId);
    }
  }, [productId]);

  const loadProduct = async (id: string) => {
    setLoading(true);
    setError('');
    
    try {
      const productData = await getProductFromBlockchain(id);
      if (productData) {
        setProduct(productData);
      } else {
        setError('Product not found');
      }
    } catch (err) {
      setError('Failed to load product data');
      toast.error('Failed to load product data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-1/3 mb-6"></div>
              <div className="h-64 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <Alert variant="destructive">
              <AlertDescription>
                {error || 'Product not found'}
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Package className="h-6 w-6" />
                Product Details
                <Badge variant={product.blockchain === 'ethereum' ? 'default' : 'secondary'}>
                  {product.blockchain === 'ethereum' ? 'Ethereum' : 'Stacks'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Product ID</label>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="font-mono">{product.id}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Product Name</label>
                  <div className="flex items-center gap-2">
                    <span>{product.name}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Origin</label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{product.origin}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Current Location</label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-500" />
                    <span>{product.currentLocation}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Recorded</label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(product.timestamp).toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Owner</label>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-mono text-sm">
                      {product.owner.slice(0, 6)}...{product.owner.slice(-4)}
                    </span>
                  </div>
                </div>
              </div>

              {product.transactionHash && (
                <div className="pt-4 border-t">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Transaction Hash</label>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <Hash className="h-4 w-4 text-muted-foreground" />
                      <span className="font-mono text-sm flex-1 truncate">
                        {product.transactionHash}
                      </span>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {product.contractAddress && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Contract Address</label>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <span className="font-mono text-sm flex-1 truncate">
                      {product.contractAddress}
                    </span>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      View
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrackProduct;