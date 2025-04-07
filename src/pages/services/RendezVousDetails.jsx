// import React, { useState } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [rendezVousId, setRendezVousId] = useState('');
//   const [statut, setStatut] = useState(''); // "accepté" ou "refusé"
//   const [dateHeure, setDateHeure] = useState(''); // Date et heure pour "accepté"
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Vérification des données
//     if (!rendezVousId || !statut) {
//       setMessage('Veuillez remplir tous les champs.');
//       return;
//     }

//     if (statut === 'accepté' && !dateHeure) {
//       setMessage('La date et l\'heure sont requises pour accepter le rendez-vous.');
//       return;
//     }

//     // Préparation des données pour la requête POST
//     const data = {
//       rendezVous_id: rendezVousId,
//       statut: statut,
//       ...(statut === 'accepté' && { dateHeure: dateHeure }), // Ajoute la dateHeure seulement si accepté
//     };

//     try {
//       // Envoi de la requête POST à la route Symfony
//       const response = await axios.post('/accepter-refuser-rdv', data);

//       if (response.data.message) {
//         setMessage(response.data.message);
//       }
//     } catch (error) {
//       setMessage('Erreur lors de l\'acceptation ou du refus du rendez-vous.');
//     }
//   };

//   return (
//     <div>
//       <h2>Gestion des Rendez-vous</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="rendezVousId">ID du Rendez-vous</label>
//           <input
//             type="number"
//             id="rendezVousId"
//             value={rendezVousId}
//             onChange={(e) => setRendezVousId(e.target.value)}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="statut">Statut</label>
//           <select
//             id="statut"
//             value={statut}
//             onChange={(e) => setStatut(e.target.value)}
//             className="form-control"
//             required
//           >
//             <option value="">Sélectionner...</option>
//             <option value="accepté">Accepté</option>
//             <option value="refusé">Refusé</option>
//           </select>
//         </div>

//         {statut === 'accepté' && (
//           <div className="form-group">
//             <label htmlFor="dateHeure">Date et Heure du Rendez-vous</label>
//             <input
//               type="datetime-local"
//               id="dateHeure"
//               value={dateHeure}
//               onChange={(e) => setDateHeure(e.target.value)}
//               className="form-control"
//               required
//             />
//           </div>
//         )}

//         <button type="submit" className="btn btn-primary">Soumettre</button>
//       </form>

//       {message && <div className="alert alert-info mt-3">{message}</div>}
//     </div>
//   );
// };

// export default App;
