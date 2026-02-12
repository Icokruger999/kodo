'use client';
import { useState, useEffect } from 'react';

const API_URL = 'http://34.245.131.150:8080';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hi! I can help you with inventory questions, restock recommendations, and supplier information. What would you like to know?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProducts([
      { id: 1, name: 'Black T-Shirt Medium', sku: 'TEE-BLK-M', stock: 15, reorder: 50, selected: false },
      { id: 2, name: 'White T-Shirt Large', sku: 'TEE-WHT-L', stock: 8, reorder: 40, selected: false },
      { id: 3, name: 'Blue Jeans 32W', sku: 'JEANS-BLU-32', stock: 25, reorder: 30, selected: false },
      { id: 4, name: 'Grey Hoodie Large', sku: 'HOODIE-GRY-L', stock: 5, reorder: 20, selected: false },
      { id: 5, name: 'Black Socks 10-Pack', sku: 'SOCKS-BLK-10', stock: 45, reorder: 100, selected: false }
    ]);
  }, []);

  const toggleProduct = (id) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, selected: !p.selected } : p
    ));
  };

  const checkRestock = async (productId) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/check-restock/${productId}`, { method: 'POST' });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert('Error: ' + err.message);
    }
    setLoading(false);
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput;
    setChatMessages([...chatMessages, { role: 'user', content: userMessage }]);
    setChatInput('');
    
    // Simulate AI response
    setTimeout(() => {
      let response = '';
      if (userMessage.toLowerCase().includes('stock') || userMessage.toLowerCase().includes('inventory')) {
        response = 'Based on current inventory levels, products #2 (White T-Shirt) and #4 (Grey Hoodie) are below reorder points and need restocking soon.';
      } else if (userMessage.toLowerCase().includes('supplier')) {
        response = 'Your main suppliers are: Guangzhou Textiles Co (China, 21 days lead time), Vietnam Manufacturing Ltd (14 days), and Local Warehouse Supply (3 days).';
      } else if (userMessage.toLowerCase().includes('forecast')) {
        response = 'Our AI forecasting shows increased demand for t-shirts in the next 30 days. Consider ordering 20% more than usual.';
      } else {
        response = 'I can help you with: inventory status, restock recommendations, supplier information, and demand forecasting. What would you like to know?';
      }
      setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa', fontFamily: 'system-ui' }}>
      <div style={{ background: '#2c3e50', color: 'white', padding: '20px 40px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>AI Supply Chain Agent</h1>
        <p style={{ margin: '5px 0 0 0', opacity: 0.9, fontSize: '14px' }}>Automated restock management powered by AWS Bedrock</p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ background: 'white', borderRadius: '8px', padding: '30px', marginBottom: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '20px', color: '#2c3e50' }}>Product Inventory</h2>
            <button
              onClick={() => {
                const selected = products.filter(p => p.selected);
                if (selected.length === 0) {
                  alert('Please select products to monitor');
                } else {
                  alert(`Monitoring ${selected.length} products for restock notifications`);
                }
              }}
              style={{ padding: '10px 20px', background: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Save Selections ({products.filter(p => p.selected).length})
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ddd', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>Monitor</th>
                <th style={{ padding: '12px' }}>Product</th>
                <th style={{ padding: '12px' }}>SKU</th>
                <th style={{ padding: '12px' }}>Stock</th>
                <th style={{ padding: '12px' }}>Reorder Point</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>
                    <input
                      type="checkbox"
                      checked={p.selected}
                      onChange={() => toggleProduct(p.id)}
                      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                  </td>
                  <td style={{ padding: '12px', fontWeight: '500' }}>{p.name}</td>
                  <td style={{ padding: '12px', color: '#666', fontSize: '14px' }}>{p.sku}</td>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: p.stock <= p.reorder ? '#e74c3c' : '#27ae60' }}>{p.stock}</td>
                  <td style={{ padding: '12px' }}>{p.reorder}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold',
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
                        background: '#27ae60',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '14px'
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
      </div>

      {/* Chatbot */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
        {chatOpen ? (
          <div style={{ width: '380px', height: '500px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: '#2c3e50', color: 'white', padding: '15px 20px', borderRadius: '12px 12px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>🤖 AI Assistant</div>
                <div style={{ fontSize: '12px', opacity: 0.9 }}>Powered by AWS Bedrock</div>
              </div>
              <button onClick={() => setChatOpen(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>×</button>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', background: '#f8f9fa' }}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{ marginBottom: '15px', display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '80%',
                    padding: '10px 15px',
                    borderRadius: '12px',
                    background: msg.role === 'user' ? '#3498db' : 'white',
                    color: msg.role === 'user' ? 'white' : '#333',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ padding: '15px', borderTop: '1px solid #ddd', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  placeholder="Ask about inventory..."
                  style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
                />
                <button
                  onClick={sendChatMessage}
                  style={{ padding: '10px 20px', background: '#3498db', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setChatOpen(true)}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#3498db',
              color: 'white',
              border: 'none',
              fontSize: '28px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            💬
          </button>
        )}
      </div>
    </div>
  );
}
