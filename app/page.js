'use client';
import { useState, useEffect } from 'react';

const API_URL = 'http://34.245.131.150:8080';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [restockLogs, setRestockLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const checkRestock = async (productId) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/check-restock/${productId}`, { method: 'POST' });
      const data = await res.json();
      alert(data.message);
      loadRestockLogs();
    } catch (err) {
      alert('Error: ' + err.message);
    }
    setLoading(false);
  };

  const approveRestock = async (logId) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/approve-restock/${logId}`, { method: 'POST' });
      const data = await res.json();
      alert(data.message);
      loadRestockLogs();
    } catch (err) {
      alert('Error: ' + err.message);
    }
    setLoading(false);
  };

  const loadRestockLogs = async () => {
    setRestockLogs([
      { id: 1, product_name: 'White T-Shirt Large', quantity: 50, status: 'pending_review' },
      { id: 2, product_name: 'Grey Hoodie Large', quantity: 30, status: 'pending_review' }
    ]);
  };

  useEffect(() => {
    setProducts([
      { id: 1, name: 'Black T-Shirt Medium', stock: 15, reorder: 50 },
      { id: 2, name: 'White T-Shirt Large', stock: 8, reorder: 40 },
      { id: 3, name: 'Blue Jeans 32W', stock: 25, reorder: 30 },
      { id: 4, name: 'Grey Hoodie Large', stock: 5, reorder: 20 },
      { id: 5, name: 'Black Socks 10-Pack', stock: 45, reorder: 100 }
    ]);
    loadRestockLogs();
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>AI Supply Chain Agent</h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>Automated restock management powered by AWS Bedrock</p>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Products</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>Product</th>
              <th style={{ padding: '12px' }}>Current Stock</th>
              <th style={{ padding: '12px' }}>Reorder Point</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{p.name}</td>
                <td style={{ padding: '12px' }}>{p.stock}</td>
                <td style={{ padding: '12px' }}>{p.reorder}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    backgroundColor: p.stock <= p.reorder ? '#fee' : '#efe',
                    color: p.stock <= p.reorder ? '#c00' : '#060'
                  }}>
                    {p.stock <= p.reorder ? 'LOW STOCK' : 'OK'}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <button
                    onClick={() => checkRestock(p.id)}
                    disabled={loading}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#0070f3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Check Restock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Pending Restock Requests</h2>
        {restockLogs.length === 0 ? (
          <p style={{ color: '#999' }}>No pending requests</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ddd', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>Product</th>
                <th style={{ padding: '12px' }}>Quantity</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {restockLogs.map(log => (
                <tr key={log.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>{log.product_name}</td>
                  <td style={{ padding: '12px' }}>{log.quantity}</td>
                  <td style={{ padding: '12px' }}>{log.status}</td>
                  <td style={{ padding: '12px' }}>
                    <button
                      onClick={() => approveRestock(log.id)}
                      disabled={loading}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      Approve & Send
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
