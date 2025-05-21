"use client";
import React, { useState, useEffect } from 'react';

const PaymentPage = () => {
    const [payments, setPayments] = useState([]);
    const [passportNumber, setPassportNumber] = useState('');
    const [visaNumber, setVisaNumber] = useState('');

    useEffect(() => {
        // Fetch payment history based on passport and visa
        if (passportNumber && visaNumber) {
            fetch(`/api/payments?passport=${passportNumber}&visa=${visaNumber}`)
                .then((response) => response.json())
                .then((data) => setPayments(data))
                .catch((error) => console.error('Error fetching payments:', error));
        } else {
            // Dummy data for luxury look
            setPayments([
                { id: 'P001', amount: '$500', date: '2023-01-15', status: 'Completed' },
                { id: 'P002', amount: '$1200', date: '2023-02-10', status: 'Pending' },
                { id: 'P003', amount: '$800', date: '2023-03-05', status: 'Failed' },
            ]);
        }
    }, [passportNumber, visaNumber]);

    const handleSearch = () => {
        // Trigger fetching payment history
        if (!passportNumber || !visaNumber) {
            alert('Please enter both Passport Number and Visa Number');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Payment Section</h1>
            <div style={styles.form}>
                <label style={styles.label}>
                    Passport Number:
                    <input
                        type="text"
                        value={passportNumber}
                        onChange={(e) => setPassportNumber(e.target.value)}
                        style={styles.input}
                    />
                </label>
                <label style={styles.label}>
                    Visa Number:
                    <input
                        type="text"
                        value={visaNumber}
                        onChange={(e) => setVisaNumber(e.target.value)}
                        style={styles.input}
                    />
                </label>
                <button onClick={handleSearch} style={styles.button}>Search</button>
            </div>
            <div style={styles.tableContainer}>
                <h2 style={styles.subHeader}>Payment History</h2>
                {payments.length > 0 ? (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Payment ID</th>
                                <th style={styles.th}>Amount</th>
                                <th style={styles.th}>Date</th>
                                <th style={styles.th}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment.id} style={styles.tr}>
                                    <td style={styles.td}>{payment.id}</td>
                                    <td style={styles.td}>{payment.amount}</td>
                                    <td style={styles.td}>{payment.date}</td>
                                    <td style={styles.td}>{payment.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p style={styles.noData}>No payment history found.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '800px',
        margin: 'auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    header: {
        textAlign: 'center',
        color: '#333',
        fontSize: '2rem',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '1rem',
        color: '#555',
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginTop: '5px',
        fontSize: '1rem',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
    },
    tableContainer: {
        marginTop: '20px',
    },
    subHeader: {
        textAlign: 'center',
        color: '#333',
        fontSize: '1.5rem',
        marginBottom: '10px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#fff',
        borderRadius: '5px',
        overflow: 'hidden',
    },
    th: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px',
        textAlign: 'left',
    },
    tr: {
        borderBottom: '1px solid #ddd',
    },
    td: {
        padding: '10px',
        textAlign: 'left',
        color: '#555',
    },
    noData: {
        textAlign: 'center',
        color: '#999',
        fontSize: '1rem',
    },
};

export default PaymentPage;