import { useState } from 'react';
import { useSlider } from '../hooks';

function Slider({ dotNavigation = false }) {
const [items] = useState([
    'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1593642532454-e138e28a63f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  ]);
  const { progress, ref: sliderRef, updateProgress, handleButton } = useSlider({
    initialValue: 1,
    totalItems: items.length,
    isDotNavigation: dotNavigation,
  });

  return (
    <section ref={sliderRef} className="slider" onScrollCapture={updateProgress}>
      <div className="slider__content">
        {items.map((item, index) => (<img key={index} src={item} alt={`desktop ${index}`}/>))}
      </div>
      <div className="slider__controls">
        <button className="prev" title="prev" onClick={handleButton}/>
        <button className="next" title="next" onClick={handleButton}/>
      </div>
      <div className={`slider__navigation ${dotNavigation ? 'is-dot' : ''}`}>
        {dotNavigation ? (
            <div className="slider__navigation-dots">{items.map((_, index) => (
              <span key={index}
                    className={`slider__navigation-dots--bullet ${index + 1 === progress ? 'active' : ''}`}/>))}</div>
          )
          : (
            <div className="slider__navigation-progress" style={{ width: `${progress}%` }}/>
          )}
      </div>
    </section>
  );
}

export default Slider;