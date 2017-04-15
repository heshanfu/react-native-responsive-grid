import React, {Component, PropTypes} from 'react';
import {screenSize} from '../lib/ScreenSize';
import {isHidden} from '../lib/helpers';
import {View, Alert} from 'react-native';

const cloneElements = (props) => {
    // if size doesn't exist or is <= 0 then default to "12 columns"" ratio
    const colPercent = Math.max(0, props.colPercent) ? Math.min(props.colPercent, 100) : 8.33333333;
    const rtl = props.rtl 

    return React.Children.map((rtl ? React.Children.toArray(props.children).reverse() : props.children), (element) => {
      if (element.type.name !== 'Column') {
          throw new Error("Row may only contain Columns")
      }
      return React.cloneElement(element, {colPercent: colPercent, rtl: rtl})
    })
}

const Row = (props) => {
  // left/flex-start is default
  const align_X =  (props.hAlign === 'space' ? 'space-between' : (props.hAlign === 'distribute' ? 'space-around' : (props.hAlign === 'center' ? 'center' : (props.hAlign === 'right' ? 'flex-end' : 'flex-start'))))
  // top/flex-start is default
  const align_Y = props.vAlign === 'center' ? 'center' : (props.vAlign === 'bottom' ? 'flex-end' : (props.vAlign === 'fill' ? 'stretch' : 'flex-start'))

  if (isHidden(screenSize, props)){
    return null;
  } else {
    try {
        return (
            <View {...props}
              style={[props.style,
                      { flexDirection: 'row',
                        flexWrap: props.nowrap ? 'nowrap' : 'wrap',
                        alignItems: align_Y,
                        justifyContent: align_X,
                        height: props.cell ? props.colPercent + '%' : (props.style && props.style.height !== undefined ? props.style.height : undefined) 
                      }]}>
                {cloneElements(props)}
            </View>
        )
    } catch (e) {
      if (__DEV__) { 
        console.error(e)
      }
      return null
    }
    
  }
}

Row.propTypes = {
  colPercent: PropTypes.number,
  rtl: PropTypes.bool,
  nowrap: PropTypes.bool,
  smHidden: PropTypes.bool,
  mdHidden: PropTypes.bool,
  lgHidden: PropTypes.bool,
  hAlign: PropTypes.string,
  vAlign: PropTypes.string
}

export default Row;