import React from 'react';
import "./style.css";

export default function ModeSelector() {
    return (
        <div className="mode-selector-cont">
          <p className="mode-text">Dark Mode</p>
          <div className="mode-selector">
                <div className="mode-button"></div>
          </div>
        </div>
    )
}
