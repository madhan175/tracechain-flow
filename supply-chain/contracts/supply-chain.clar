;; title: supply-chain
;; version: 1.0
;; summary: Food supply chain tracking system
;; description: Smart contract for tracking food products through the supply chain

;; constants
(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_UNAUTHORIZED (err u100))
(define-constant ERR_PRODUCT_NOT_FOUND (err u101))
(define-constant ERR_INVALID_CHECKPOINT (err u102))
(define-constant ERR_DUPLICATE_PRODUCT (err u103))

;; data maps
(define-map products
  { product-id: (string-ascii 64) }
  {
    farmer: principal,
    batch-id: (string-ascii 64),
    harvest-date: uint,
    location: (string-ascii 128),
    current-stage: (string-ascii 32),
    created-at: uint
  }
)

(define-map checkpoints
  { product-id: (string-ascii 64), checkpoint-id: uint }
  {
    stage: (string-ascii 32),
    actor: principal,
    data: (string-ascii 512),
    timestamp: uint,
    verified: bool
  }
)

(define-map checkpoint-counters
  { product-id: (string-ascii 64) }
  { count: uint }
)

;; public functions

;; Farmer: Create initial product record
(define-public (create-product (product-id (string-ascii 64)) (batch-id (string-ascii 64)) (harvest-date uint) (location (string-ascii 128)))
  (let ((existing-product (map-get? products { product-id: product-id })))
    (if (is-some existing-product)
      ERR_DUPLICATE_PRODUCT
      (begin
        (map-set products
          { product-id: product-id }
          {
            farmer: tx-sender,
            batch-id: batch-id,
            harvest-date: harvest-date,
            location: location,
            current-stage: "farm",
            created-at: block-height
          }
        )
        (map-set checkpoint-counters { product-id: product-id } { count: u0 })
        (add-checkpoint product-id "farm" (concat "Harvest - Batch: " batch-id))
      )
    )
  )
)

;; Add checkpoint for any stage
(define-public (add-checkpoint (product-id (string-ascii 64)) (stage (string-ascii 32)) (checkpoint-data (string-ascii 512)))
  (let (
    (product (unwrap! (map-get? products { product-id: product-id }) ERR_PRODUCT_NOT_FOUND))
    (counter-data (default-to { count: u0 } (map-get? checkpoint-counters { product-id: product-id })))
    (next-checkpoint-id (+ (get count counter-data) u1))
  )
    (begin
      (map-set checkpoints
        { product-id: product-id, checkpoint-id: next-checkpoint-id }
        {
          stage: stage,
          actor: tx-sender,
          data: checkpoint-data,
          timestamp: block-height,
          verified: false
        }
      )
      (map-set checkpoint-counters
        { product-id: product-id }
        { count: next-checkpoint-id }
      )
      (map-set products
        { product-id: product-id }
        (merge product { current-stage: stage })
      )
      (ok next-checkpoint-id)
    )
  )
)

;; Processor: Add processing checkpoint
(define-public (add-processing-checkpoint (product-id (string-ascii 64)) (quality-data (string-ascii 512)))
  (add-checkpoint product-id "processing" quality-data)
)

;; Transporter: Add transport checkpoint
(define-public (add-transport-checkpoint (product-id (string-ascii 64)) (transport-data (string-ascii 512)))
  (add-checkpoint product-id "transport" transport-data)
)

;; Retailer: Add retail checkpoint
(define-public (add-retail-checkpoint (product-id (string-ascii 64)) (stock-data (string-ascii 512)))
  (add-checkpoint product-id "retail" stock-data)
)

;; Regulator: Verify checkpoint
(define-public (verify-checkpoint (product-id (string-ascii 64)) (checkpoint-id uint))
  (let ((checkpoint (unwrap! (map-get? checkpoints { product-id: product-id, checkpoint-id: checkpoint-id }) ERR_PRODUCT_NOT_FOUND)))
    (map-set checkpoints
      { product-id: product-id, checkpoint-id: checkpoint-id }
      (merge checkpoint { verified: true })
    )
    (ok true)
  )
)

;; read only functions

;; Get product details
(define-read-only (get-product (product-id (string-ascii 64)))
  (map-get? products { product-id: product-id })
)

;; Get checkpoint details
(define-read-only (get-checkpoint (product-id (string-ascii 64)) (checkpoint-id uint))
  (map-get? checkpoints { product-id: product-id, checkpoint-id: checkpoint-id })
)

;; Get checkpoint count for a product
(define-read-only (get-checkpoint-count (product-id (string-ascii 64)))
  (default-to { count: u0 } (map-get? checkpoint-counters { product-id: product-id }))
)

;; Get all checkpoints for a product (returns list of checkpoint IDs)
(define-read-only (get-product-checkpoints (product-id (string-ascii 64)))
  (let ((count-data (get-checkpoint-count product-id)))
    (map get-checkpoint-id (list u1 u2 u3 u4 u5 u6 u7 u8 u9 u10))
  )
)

;; Helper function to get checkpoint ID
(define-read-only (get-checkpoint-id (index uint))
  index
)