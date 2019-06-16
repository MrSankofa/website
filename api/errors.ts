export class NoBodyError extends Error {
  readonly message = "No request body supplied";
}

export class NoSignatureKeyError extends Error {
  readonly message = "No signature key supplied";
}

export class SignatureMismatchError extends Error {
  readonly message = "Signatures don't match";
}

export class InventoryMismatchError extends Error {
  readonly message = "Can't find matching inventory item";
}
