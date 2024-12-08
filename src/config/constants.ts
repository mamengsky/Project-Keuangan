export const RECORDERS = {
  KOMISARIS: 'Alvin Abhinaya Harmony (Komisaris Utama)',
  BENDAHARA: 'Nathalia L Kusuma (Bendahara)',
  STAFF: 'Wawa Silvamilion Mexicola (Staff Ahli)',
} as const;

export const TRANSACTION_PURPOSES = {
  DEPOSIT: [
    'Deposit Anggota Baru',
    'Denda Resign',
    'Setoran',
    'KTA Trans',
    'Other',
  ],
  WITHDRAWAL: [
    'Reimburse',
    'Sponsorship',
    'Gaji Pegawai',
    'Pajak',
    'Other',
  ],
} as const;