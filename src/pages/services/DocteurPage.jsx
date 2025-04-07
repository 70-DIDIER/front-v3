import React, { useEffect, useState } from 'react';
import api from '../../services/Api';

export default function RendezVousDocteurList() {
    const [rendezVousList, setRendezVousList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRendezVous = async () => {
            try {
                const response = await api.get('/mes-rendezvous-docteur');
                setRendezVousList(response.data);
            } catch (err) {
                setError("Erreur lors du chargement des rendez-vous.");
            } finally {
                setLoading(false);
            }
        };
        fetchRendezVous();
    }, []);

    const handleAction = async (id, statut) => {
        const date = prompt("Entrez la date (YYYY-MM-DD) :", new Date().toISOString().split('T')[0]);
        const heure = prompt("Entrez l'heure (HH:MM) :", "10:00");

        try {
            await api.put(`/rendezvous/${id}/update`, {
                statut,
                dateConsultationAt: date,
                heureConsultation: heure
            });

            // Rafraîchissement après mise à jour
            setRendezVousList(prev =>
                prev.map(rdv => rdv.id === id ? { ...rdv, statut, dateConsultationAt: date, heureConsultation: heure } : rdv)
            );
        } catch (err) {
            alert("Erreur lors de la mise à jour du rendez-vous.");
        }
    };

    if (loading) return <div className="text-center mt-4">Chargement...</div>;
    if (error) return <div className="alert alert-danger text-center">{error}</div>;

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-header bg-success text-white">
                    <h4 className="mb-0">Rendez-vous reçus</h4>
                </div>
                <div className="card-body">
                    {rendezVousList.length === 0 ? (
                        <p className="text-center">Aucun rendez-vous trouvé.</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>#</th>
                                        <th>Description</th>
                                        <th>Type</th>
                                        <th>Date</th>
                                        <th>Heure</th>
                                        <th>Statut</th>
                                        <th>Patient</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rendezVousList.map((rdv, index) => (
                                        <tr key={rdv.id}>
                                            <td>{index + 1}</td>
                                            <td>{rdv.description}</td>
                                            <td>{rdv.typeConsultation}</td>
                                            <td>{rdv.dateConsultationAt ? new Date(rdv.dateConsultationAt).toLocaleDateString() : '-'}</td>
                                            <td>{rdv.heureConsultation ? new Date(rdv.heureConsultation).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}</td>
                                            <td>
                                                <span className={`badge bg-${rdv.statut === 'en attente' ? 'warning' : rdv.statut === 'accepté' ? 'success' : 'danger'}`}>
                                                    {rdv.statut}
                                                </span>
                                            </td>
                                              {rdv.patient?.nom} {rdv.patient?.prenom}
                                            <td>
                                              {rdv.statut?.toLowerCase() === 'en attente' && (
                                                  <>
                                                      <button onClick={() => handleAction(rdv.id, 'accepté')} className="btn btn-sm btn-success me-2">Accepter</button>
                                                      <button onClick={() => handleAction(rdv.id, 'refusé')} className="btn btn-sm btn-danger">Refuser</button>
                                                  </>
                                                )}
                                                
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
