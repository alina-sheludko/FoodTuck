import { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

const PriceRange: React.FC<{prices: number[], value: number[], onChangeValues:  (values: number[]) => void, filters: {}}> = ({prices,  value, onChangeValues, filters }) => {
  const STEP = 1;
  const MIN = prices[0];
  const MAX = prices[1];
  const [values, setValues] = useState(value);
    
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(e) =>{ 
          setValues(e)
          return values;
      }} 
        onFinalChange={(e) => {
          onChangeValues({...filters, price: e})
          return filters;
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '36px',
              display: 'flex',
              width: '95%'
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '5px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values: value,
                  colors: ['#ccc', '#FF9F0D', '#ccc'],
                  min: MIN,
                  max: MAX,
                }),
                alignSelf: 'center'
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '11px',
              width: '11px',
              borderRadius: '4px',
              backgroundColor: '#FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 6px #AAA',
              filter: 'drop-shadow(0px 0px 7px rgba(22, 50, 158, 0.141))'
            }}
          >
            <div
              style={{
                height: '6px',
                width: '6px',
                backgroundColor: '#FF9F0D',
                borderRadius: '4px'
              }}
              />
          </div>
        )}
        />
      <output 
        style={{ 
          fontFamily: 'Inter',
          fontSize: '16px',
          lineHeight: '1.5',
          color: '#1E1E1E',
          opacity: '0.61'          
        }} 
        id="output"> 
        From ${value[0].toFixed(2)} to ${value[1].toFixed(2)}
      </output>
    </div>
  );
};

export default PriceRange;