import React from 'react';

interface HeaderProps {
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => (
  <header className="header bg-white shadow">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <h1 className="header__title text-2xl font-bold">AI Project Manager</h1>
      <nav className="header__nav">
        <button className="btn btn-outline btn-sm" onClick={onReset}>
          Reset Project
        </button>
      </nav>
    </div>
  </header>
);
