import React, { useState, useRef } from 'react';

const mindData = {
  id: 'root',
  label: 'Launch Strategy',
  color: '#7C5CFC',
  children: [
    {
      id: 'product',
      label: 'Product',
      color: '#3B9EFF',
      children: [
        { id: 'mvp', label: 'Define MVP', color: '#3B9EFF', children: [] },
        { id: 'features', label: 'Core Features', color: '#3B9EFF', children: [] },
        { id: 'ux', label: 'UX Design', color: '#3B9EFF', children: [] },
      ],
    },
    {
      id: 'market',
      label: 'Market',
      color: '#2BDFB0',
      children: [
        { id: 'ica', label: 'ICA Research', color: '#2BDFB0', children: [] },
        { id: 'comp', label: 'Competitors', color: '#2BDFB0', children: [] },
      ],
    },
    {
      id: 'ops',
      label: 'Operations',
      color: '#FFB547',
      children: [
        { id: 'team', label: 'Team Setup', color: '#FFB547', children: [] },
        { id: 'budget', label: 'Budgeting', color: '#FFB547', children: [] },
        { id: 'timeline', label: 'Timeline', color: '#FFB547', children: [] },
      ],
    },
    {
      id: 'growth',
      label: 'Growth',
      color: '#FF6B9D',
      children: [
        { id: 'marketing', label: 'Marketing', color: '#FF6B9D', children: [] },
        { id: 'launch', label: '🚀 Launch', color: '#FF6B9D', children: [] },
      ],
    },
  ],
};

const NODE_W = 110;
const NODE_H = 30;
const H_GAP = 80;
const V_GAP = 44;

const layoutTree = (node, x, y) => {
  node._x = x;
  node._y = y;
  if (!node.expanded || !node.children?.length) return;

  const totalHeight = (node.children.length - 1) * V_GAP;
  let cy = y - totalHeight / 2;
  node.children.forEach(child => {
    layoutTree(child, x + NODE_W + H_GAP, cy);
    cy += V_GAP;
  });
};

const collectNodes = (node, list = []) => {
  list.push(node);
  if (node.expanded && node.children) node.children.forEach(c => collectNodes(c, list));
  return list;
};

const collectEdges = (node, list = []) => {
  if (node.expanded && node.children) {
    node.children.forEach(c => {
      list.push({ from: node, to: c });
      collectEdges(c, list);
    });
  }
  return list;
};

const MindMap = () => {
  const [tree, setTree] = useState(() => {
    const root = JSON.parse(JSON.stringify(mindData));
    root.expanded = true;
    root.children.forEach(c => { c.expanded = false; });
    return root;
  });

  const [hovered, setHovered] = useState(null);
  const svgRef = useRef(null);

  const toggleNode = (id) => {
    const toggle = (node) => {
      if (node.id === id) { node.expanded = !node.expanded; return; }
      if (node.children) node.children.forEach(toggle);
    };
    const newTree = JSON.parse(JSON.stringify(tree));
    toggle(newTree);
    setTree(newTree);
  };

  const layoutRoot = JSON.parse(JSON.stringify(tree));
  layoutTree(layoutRoot, 20, 200);
  const nodes = collectNodes(layoutRoot);
  const edges = collectEdges(layoutRoot);

  const allX = nodes.map(n => n._x).filter(Boolean);
  const allY = nodes.map(n => n._y).filter(Boolean);
  const svgW = Math.max(...allX) + NODE_W + 40;
  const svgH = Math.max(...allY) + NODE_H + 40;

  return (
    <div style={{ width: '100%', overflowX: 'auto', overflowY: 'auto' }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${svgW} ${svgH}`}
        style={{ width: '100%', minWidth: '500px', height: 'auto', minHeight: '350px' }}
      >
        {/* Edges */}
        {edges.map((edge, i) => {
          const fx = edge.from._x + NODE_W;
          const fy = edge.from._y + NODE_H / 2;
          const tx = edge.to._x;
          const ty = edge.to._y + NODE_H / 2;
          const mx = (fx + tx) / 2;
          return (
            <path
              key={i}
              d={`M ${fx} ${fy} C ${mx} ${fy}, ${mx} ${ty}, ${tx} ${ty}`}
              fill="none"
              stroke={edge.from.color}
              strokeWidth="1.5"
              strokeOpacity="0.45"
              style={{ transition: 'all 0.4s ease' }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map(node => {
          if (node._x == null) return null;
          const isHovered = hovered === node.id;
          const hasChildren = node.children?.length > 0;
          return (
            <g
              key={node.id}
              style={{ cursor: hasChildren ? 'pointer' : 'default' }}
              onClick={() => hasChildren && toggleNode(node.id)}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <rect
                x={node._x}
                y={node._y}
                width={NODE_W}
                height={NODE_H}
                rx={NODE_H / 2}
                fill={isHovered ? `${node.color}25` : `${node.color}15`}
                stroke={node.color}
                strokeWidth={isHovered ? 1.5 : 1}
                style={{ transition: 'all 0.2s ease' }}
              />
              <text
                x={node._x + NODE_W / 2}
                y={node._y + NODE_H / 2 + 4}
                textAnchor="middle"
                fill={node.color}
                fontSize="10"
                fontFamily="Inter, sans-serif"
                fontWeight="600"
              >
                {node.label}
              </text>
              {hasChildren && (
                <text
                  x={node._x + NODE_W - 10}
                  y={node._y + NODE_H / 2 + 4}
                  textAnchor="middle"
                  fill={node.color}
                  fontSize="10"
                  fontWeight="700"
                >
                  {node.expanded ? '−' : '+'}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default MindMap;
