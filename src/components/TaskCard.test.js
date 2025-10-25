// Exemple de test pour TaskCard
// Note: Ceci est un exemple basique pour montrer comment tester un composant

/*
Pour tester ce composant, vous auriez besoin d'installer:
- @testing-library/react
- @testing-library/jest-dom
- jest

Test basique:

import { render, screen } from '@testing-library/react';
import TaskCard from './TaskCard';

describe('TaskCard', () => {
  it('affiche le titre de la tâche', () => {
    const task = {
      id: '1',
      title: 'Ma tâche test',
      description: 'Description test',
      completed: false
    };
    
    render(
      <TaskCard 
        task={task} 
        onToggle={() => {}} 
        onDelete={() => {}} 
      />
    );
    
    expect(screen.getByText('Ma tâche test')).toBeInTheDocument();
  });
  
  it('affiche un bouton de suppression', () => {
    const task = {
      id: '1',
      title: 'Ma tâche test',
      completed: false
    };
    
    render(
      <TaskCard 
        task={task} 
        onToggle={() => {}} 
        onDelete={() => {}} 
      />
    );
    
    expect(screen.getByText('🗑️')).toBeInTheDocument();
  });
});
*/

// Pour exécuter les tests: npm test
