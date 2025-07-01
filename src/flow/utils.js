// Utility to check if only one node lacks an outgoing edge
export const isValidFlow = (nodes, edges) => {
  if (nodes.length <= 1) return true;
  const nodesWithOutgoing = new Set(edges.map((e) => e.source));
  const nodesWithoutOutgoing = nodes.filter((n) => !nodesWithOutgoing.has(n.id));
  return nodesWithoutOutgoing.length <= 1;
};

// Logs flow structure in console
export const logFlow = (nodes, edges) => {
  console.log('--- Flow State ---');
  console.log('Nodes:', nodes);
  console.log('Edges:', edges);
};

