import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialNodes = [
  {
    id: 'strategy-root',
    type: 'root',
    title: 'Project Strategy',
    x: 40,
    y: 260,
    w: 210,
    h: 56,
    color: '#4F46E5',
    bullets: []
  },
  {
    id: 'research',
    type: 'research',
    title: 'Research & Discovery',
    x: 350,
    y: 40,
    w: 240,
    h: 160,
    color: '#10B981',
    bgColor: '#FFFFFF',
    borderColor: '#E6F4EA',
    bullets: ['Market Research', 'Competitor Analysis', 'User Interviews']
  },
  {
    id: 'planning',
    type: 'planning',
    title: 'Strategy & Planning',
    x: 350,
    y: 320,
    w: 240,
    h: 180,
    color: '#3B82F6',
    bgColor: '#FFFFFF',
    borderColor: '#E8F0FE',
    bullets: ['Define Objectives', 'Target Audience', 'MVP Features', 'Roadmap']
  },
  {
    id: 'development',
    type: 'development',
    title: 'Product Development',
    x: 670,
    y: 320,
    w: 240,
    h: 180,
    color: '#F59E0B',
    bgColor: '#FFFFFF',
    borderColor: '#FEF7E0',
    bullets: ['Sprint 1 (Design)', 'Sprint 2 (Build)', 'QA Testing', 'Beta Release']
  },
  {
    id: 'growth',
    type: 'growth',
    title: 'Launch & Growth',
    x: 990,
    y: 320,
    w: 240,
    h: 180,
    color: '#8B5CF6',
    bgColor: '#FFFFFF',
    borderColor: '#F3E8FF',
    bullets: ['Marketing Campaign', 'Launch Day', 'Post-Launch Support', 'Data Analysis']
  }
];

const initialConnections = [
  { from: 'strategy-root', to: 'research', color: '#34D399' },
  { from: 'strategy-root', to: 'planning', color: '#60A5FA' },
  { from: 'planning', to: 'development', color: '#FBBF24' },
  { from: 'development', to: 'growth', color: '#A78BFA' }
];

const WorkspacePage = () => {
  const navigate = useNavigate();

  // Nodes and Connections State
  const [nodes, setNodes] = useState(initialNodes);
  const [connections, setConnections] = useState(initialConnections);

  // Toast State
  const [toastMessage, setToastMessage] = useState('');
  
  // Modals State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Add Node Form State
  const [newNodeTitle, setNewNodeTitle] = useState('');
  const [newNodeCategory, setNewNodeCategory] = useState('planning');
  const [newNodeParent, setNewNodeParent] = useState('strategy-root');
  const [newNodeBullets, setNewNodeBullets] = useState('');

  // Edit Node Form State
  const [selectedNodeForEdit, setSelectedNodeForEdit] = useState(null);
  const [editNodeTitle, setEditNodeTitle] = useState('');
  const [editNodeBullets, setEditNodeBullets] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleAddNodeSubmit = (e) => {
    e.preventDefault();
    if (!newNodeTitle.trim()) return;

    const parentNode = nodes.find(n => n.id === newNodeParent);
    if (!parentNode) return;

    // Place new node next to its parent, offset depending on sibling count
    const siblings = connections.filter(c => c.from === parentNode.id);
    const offsetX = parentNode.w + 80;
    const offsetY = (siblings.length * 190) - 80;

    const newId = `node-${Date.now()}`;
    const categoryThemes = {
      research: { color: '#10B981', bgColor: '#FFFFFF', borderColor: '#E6F4EA' },
      planning: { color: '#3B82F6', bgColor: '#FFFFFF', borderColor: '#E8F0FE' },
      development: { color: '#F59E0B', bgColor: '#FFFFFF', borderColor: '#FEF7E0' },
      growth: { color: '#8B5CF6', bgColor: '#FFFFFF', borderColor: '#F3E8FF' }
    };
    const theme = categoryThemes[newNodeCategory] || categoryThemes.planning;

    const createdNode = {
      id: newId,
      type: newNodeCategory,
      title: newNodeTitle,
      x: parentNode.x + offsetX,
      y: parentNode.y + offsetY,
      w: 240,
      h: 160,
      bullets: newNodeBullets.split('\n').filter(b => b.trim()),
      ...theme
    };

    setNodes(prev => [...prev, createdNode]);
    setConnections(prev => [...prev, { from: parentNode.id, to: newId, color: theme.color + 'A0' }]);
    
    // Reset Form
    setNewNodeTitle('');
    setNewNodeBullets('');
    setIsAddModalOpen(false);
    showToast(`✓ Node "${newNodeTitle}" added successfully!`);
  };

  const handleEditNodeClick = (node) => {
    setSelectedNodeForEdit(node);
    setEditNodeTitle(node.title);
    setEditNodeBullets(node.bullets.join('\n'));
    setIsEditModalOpen(true);
  };

  const handleEditNodeSubmit = (e) => {
    e.preventDefault();
    if (!selectedNodeForEdit) return;

    setNodes(prev => prev.map(n => {
      if (n.id === selectedNodeForEdit.id) {
        return {
          ...n,
          title: editNodeTitle,
          bullets: editNodeBullets.split('\n').filter(b => b.trim())
        };
      }
      return n;
    }));
    setIsEditModalOpen(false);
    showToast(`✓ Node "${editNodeTitle}" updated successfully!`);
  };

  const handleDeleteNode = () => {
    if (!selectedNodeForEdit) return;
    if (selectedNodeForEdit.id === 'strategy-root') {
      showToast('❌ Cannot delete the root Project Strategy node.');
      return;
    }
    setNodes(prev => prev.filter(n => n.id !== selectedNodeForEdit.id));
    setConnections(prev => prev.filter(c => c.from !== selectedNodeForEdit.id && c.to !== selectedNodeForEdit.id));
    setIsEditModalOpen(false);
    showToast(`✓ Node "${selectedNodeForEdit.title}" deleted.`);
  };

  // Find node coordinates helper
  const getNodeCoords = (id) => {
    const node = nodes.find(n => n.id === id);
    if (!node) return { x: 0, y: 0, w: 0, h: 0 };
    return node;
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100vh',
      background: '#FAFAFA',
      fontFamily: "'Inter', sans-serif",
      overflow: 'hidden'
    }}>
      {/* ── TOP HEADER (BREADCRUMB + ACTION BAR) ── */}
      <header style={{
        height: '80px',
        borderBottom: '1px solid #ECEFF2',
        background: '#FFFFFF',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        {/* Left: Breadcrumbs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.02em' }}>
            Project Strategy &rsaquo; Q4 Product Launch
          </div>
          <h1 style={{
            fontSize: '1.45rem',
            fontWeight: 800,
            color: '#0F172A',
            letterSpacing: '-0.02em',
            margin: 0
          }}>
            Q4 Product Launch Strategy
          </h1>
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setIsAddModalOpen(true)}
            style={{
              background: '#4F46E5',
              color: '#FFFFFF',
              fontSize: '0.85rem',
              fontWeight: 700,
              padding: '10px 18px',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.18)',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#4338CA'}
            onMouseLeave={e => e.currentTarget.style.background = '#4F46E5'}
          >
            + Add Node
          </button>
          
          <button
            onClick={() => showToast('Connection mode active: Click parent then child node to connect.')}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              color: '#475569',
              fontSize: '0.85rem',
              fontWeight: 600,
              padding: '10px 18px',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
            onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}
          >
            Connect
          </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              showToast('🔗 Strategy share link copied to clipboard!');
            }}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              color: '#475569',
              fontSize: '0.85rem',
              fontWeight: 600,
              padding: '10px 18px',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
            onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}
          >
            Share
          </button>

          <button
            onClick={() => showToast('✓ Strategy saved successfully!')}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              color: '#475569',
              fontSize: '0.85rem',
              fontWeight: 600,
              padding: '10px 18px',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
            onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}
          >
            Save
          </button>
        </div>
      </header>

      {/* ── CANVAS WORKSPACE ── */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        position: 'relative',
        padding: '60px 40px'
      }}>
        {/* Internal scrollable canvas map wrapper */}
        <div style={{ position: 'relative', width: '1350px', height: '620px' }}>
          
          {/* Connection Lines (SVG Overlay) */}
          <svg style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1
          }}>
            {connections.map((conn, idx) => {
              const from = getNodeCoords(conn.from);
              const to = getNodeCoords(conn.to);
              
              const fx = from.x + from.w;
              const fy = from.y + from.h / 2;
              const tx = to.x;
              const ty = to.y + to.h / 2;
              const mx = (fx + tx) / 2;
              
              return (
                <path
                  key={`line-${idx}`}
                  d={`M ${fx} ${fy} C ${mx} ${fy}, ${mx} ${ty}, ${tx} ${ty}`}
                  fill="none"
                  stroke={conn.color || '#CBD5E1'}
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  style={{ transition: 'all 0.3s ease' }}
                />
              );
            })}
          </svg>

          {/* Interactive Mindmap Nodes */}
          {nodes.map((node) => {
            const isRoot = node.type === 'root';
            
            return (
              <div
                key={node.id}
                onClick={() => handleEditNodeClick(node)}
                style={{
                  position: 'absolute',
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  width: `${node.w}px`,
                  minHeight: `${node.h}px`,
                  background: isRoot ? 'linear-gradient(135deg, #4F46E5, #6366F1)' : node.bgColor,
                  border: isRoot ? 'none' : `1.5px solid ${node.borderColor || '#E2E8F0'}`,
                  borderRadius: '16px',
                  boxShadow: isRoot 
                    ? '0 10px 30px rgba(79, 70, 229, 0.3)' 
                    : '0 4px 12px rgba(0, 0, 0, 0.02)',
                  padding: isRoot ? '14px 20px' : '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 2,
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = isRoot 
                    ? '0 12px 35px rgba(79, 70, 229, 0.4)' 
                    : '0 8px 20px rgba(0, 0, 0, 0.06)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = isRoot 
                    ? '0 10px 30px rgba(79, 70, 229, 0.3)' 
                    : '0 4px 12px rgba(0, 0, 0, 0.02)';
                }}
              >
                {isRoot ? (
                  /* Root Node Layout */
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>🎯</span>
                    <span style={{
                      color: '#FFFFFF',
                      fontSize: '0.98rem',
                      fontWeight: 800,
                      letterSpacing: '-0.01em'
                    }}>
                      {node.title}
                    </span>
                  </div>
                ) : (
                  /* Detail Node Layout */
                  <div>
                    {/* Header: Bullet indicator + Title */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                      <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: node.color,
                        display: 'inline-block'
                      }} />
                      <h3 style={{
                        fontSize: '0.94rem',
                        fontWeight: 800,
                        color: '#0F172A',
                        margin: 0
                      }}>
                        {node.title}
                      </h3>
                    </div>

                    {/* Bullet Points */}
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}>
                      {node.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} style={{
                          fontSize: '0.82rem',
                          color: '#475569',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <span style={{ color: node.color, fontSize: '10px' }}>&bull;</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}

        </div>
      </div>

      {/* ── TOAST NOTIFICATION ── */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          background: '#0F172A',
          color: '#FFFFFF',
          padding: '12px 24px',
          borderRadius: '10px',
          fontSize: '0.88rem',
          fontWeight: 600,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
          animation: 'fadeInUp 0.3s ease',
          zIndex: 10000
        }}>
          {toastMessage}
        </div>
      )}

      {/* ── MODAL: ADD NODE ── */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'rgba(15, 23, 42, 0.35)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <form
            onSubmit={handleAddNodeSubmit}
            style={{
              background: '#FFFFFF',
              border: '1px solid #ECEFF2',
              borderRadius: '16px',
              padding: '28px',
              width: '100%',
              maxWidth: '440px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Add Strategy Node</h2>
            
            {/* Category Select */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>Category Theme</label>
              <select
                value={newNodeCategory}
                onChange={e => setNewNodeCategory(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }}
              >
                <option value="research">Green (Research)</option>
                <option value="planning">Blue (Planning)</option>
                <option value="development">Yellow (Development)</option>
                <option value="growth">Purple (Growth)</option>
              </select>
            </div>

            {/* Parent Node Select */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>Connect Parent</label>
              <select
                value={newNodeParent}
                onChange={e => setNewNodeParent(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }}
              >
                {nodes.map(n => (
                  <option key={n.id} value={n.id}>{n.title}</option>
                ))}
              </select>
            </div>

            {/* Title Input */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>Node Title</label>
              <input
                type="text"
                value={newNodeTitle}
                onChange={e => setNewNodeTitle(e.target.value)}
                placeholder="e.g. User Testing"
                required
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }}
              />
            </div>

            {/* Bullets input */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>Bullet Points (One per line)</label>
              <textarea
                value={newNodeBullets}
                onChange={e => setNewNodeBullets(e.target.value)}
                placeholder="Item 1&#10;Item 2&#10;Item 3"
                rows={3}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', resize: 'none', fontFamily: 'inherit' }}
              />
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', background: 'transparent', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: '#FFFFFF', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 }}
              >
                Add Node
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── MODAL: EDIT NODE ── */}
      {isEditModalOpen && selectedNodeForEdit && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'rgba(15, 23, 42, 0.35)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <form
            onSubmit={handleEditNodeSubmit}
            style={{
              background: '#FFFFFF',
              border: '1px solid #ECEFF2',
              borderRadius: '16px',
              padding: '28px',
              width: '100%',
              maxWidth: '440px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Edit Strategy Node</h2>
            
            {/* Title */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>Node Title</label>
              <input
                type="text"
                value={editNodeTitle}
                disabled={selectedNodeForEdit.type === 'root'}
                onChange={e => setEditNodeTitle(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', background: selectedNodeForEdit.type === 'root' ? '#F8FAFC' : 'transparent' }}
              />
            </div>

            {/* Bullets */}
            {selectedNodeForEdit.type !== 'root' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>Bullet Points (One per line)</label>
                <textarea
                  value={editNodeBullets}
                  onChange={e => setEditNodeBullets(e.target.value)}
                  rows={4}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', resize: 'none', fontFamily: 'inherit' }}
                />
              </div>
            )}

            {/* Action buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '8px' }}>
              {selectedNodeForEdit.type !== 'root' ? (
                <button
                  type="button"
                  onClick={handleDeleteNode}
                  style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #FECACA', background: '#FEF2F2', color: '#EF4444', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
                >
                  Delete
                </button>
              ) : <div />}

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', background: 'transparent', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: '#FFFFFF', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default WorkspacePage;
