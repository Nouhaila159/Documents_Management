export interface Document {
  id: number;
  title: string;
  path: string;
  type: string;
  sizeInBytes: number;
  ownerId: string;  // Identifiant du propriétaire
  folderId: number;
  lastModified: string;  // Date et heure de la dernière modification
}
