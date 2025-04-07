import React, { useEffect, useState } from 'react';
import api from '../../services/Api';

export default function RendezVousList() {
    const [rendezVousList, setRendezVousList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRendezVous = async () => {
            try {
                const response = await api.get('/rendezVous'); // 🔁 adapte cette route selon ton backend
                setRendezVousList(response.data);
            } catch (err) {
                setError("Erreur lors du chargement des rendez-vous.");
            } finally {
                setLoading(false);
            }
        };
        fetchRendezVous();
    }, []);

    if (loading) return <div className="text-center mt-4">Chargement...</div>;

    if (error) return <div className="alert alert-danger text-center">{error}</div>;

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Mes Rendez-vous</h4>
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
                                        <th>Médecin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rendezVousList.map((rdv, index) => (
                                        <tr key={rdv.id}>
                                            <td>{index + 1}</td>
                                            <td>{rdv.description}</td>
                                            <td>{rdv.typeConsultation}</td>
                                            <td>{new Date(rdv.dateConsultationAt).toLocaleDateString()}</td>
                                            <td>{new Date(rdv.heureConsultation).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                            <td>
                                                <span className={`badge bg-${rdv.statut === 'en attente' ? 'warning' : 'success'}`}>
                                                    {rdv.statut}
                                                </span>
                                            </td>
                                            <td>
                                                {rdv.docteur.nom} {rdv.docteur.prenom} {/* ou adapte si nom/prénom dispo */}
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
