import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/Api";

export default function Register() {
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        setIsSubmitting(true);

        try {
            const registerResponse = await api.post('/register', {
                nom: formData.nom,
                prenom: formData.prenom,
                email: formData.email,
                password: formData.password
            });

            console.log("Réponse API inscription:", registerResponse.data); // Debug

            // Vérifier si l'inscription est réussie
            if (!registerResponse.data.userId) {
                throw new Error(registerResponse.data.message || "Erreur lors de l'inscription");
            }

            console.log("Inscription réussie ! Redirection vers login...");

            // 🔥 Redirection immédiate vers la page de connexion
            navigate("/login");

        } catch (err) {
            console.error("Erreur d'inscription :", err.message);
            setError(err.message || "Erreur inconnue");
        } finally {
            setIsSubmitting(false);
        }



    };

    return (
        <div className="container col-md-6 col-lg-4 mt-5">
            <div className="card shadow">
                <div className="card-body p-4">
                    <h2 className="text-center mb-4">Inscription</h2>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label htmlFor="nom" className="form-nom">Nom</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nom"
                                value={formData.nom}
                                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="prenom" className="form-prenom">Prénom</label>
                            <input
                                type="text"
                                className="form-control"
                                id="prenom"
                                value={formData.prenom}
                                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Mot de passe</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                minLength="6"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="form-label">Confirmation</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
                        </button>
                    </form>

                    <div className="mt-3 text-center">
                        <p>Déjà inscrit ? <a href="/login">Connectez-vous</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}