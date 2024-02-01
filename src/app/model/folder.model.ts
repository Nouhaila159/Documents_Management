export interface Folder {
  id: number;
  name: string;
  ownerId: string;  // Identifiant du propriétaire
  documents: number[];  // Liste des ID de documents dans ce dossier
  lastModified: string;  // Date et heure de la dernière modification
}
