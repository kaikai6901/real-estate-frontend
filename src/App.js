import React, { useState} from 'react';
import Summary from './components/summary/Summary';
import News from './components/news/News';
import Project from './components/project/Project';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('Summary');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  let content;
  if (activeTab === 'Summary') {
    content = <Summary />;
  } else if (activeTab === 'News') {
    content = <News />;
  } else if (activeTab === 'Project') {
    console.log('project')
    content = <Project />;
  }

  return (
    <div>
      <div className='header'>
        <div className='nav-pane'>
          <button className='redirect_button' onClick={() => handleTabClick('Summary')}>Tổng quan</button>
          <button className='redirect_button' onClick={() => handleTabClick('News')}>Tìm kiếm</button>
          <button className='redirect_button' onClick={() => handleTabClick('Project')}>Định giá</button>
        </div>
      </div>
      <div className='main-content'>
      {content}
      </div>
    </div>
  );

};

export default App;
