import React, { Component, PropTypes } from 'react';

import VSplit from './vsplit';
import HSplit from './hsplit';
import SplitPane from '@kadira/react-split-pane';

import { rootStyle, fullScreenPreviewStyle } from './commonLayoutStyles';

const leftPanelStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
};

const downPanelStyle = {
  display: 'flex',
  position: 'absolute',
  width: '100%',
  height: '100%',
  padding: '5px 10px 10px 0',
  boxSizing: 'border-box',
};

const contentPanelStyle = {
  position: 'absolute',
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  padding: '10px 10px 10px 0',
};

const normalPreviewStyle = {
  width: '100%',
  height: '100%',
  backgroundColor: '#FFF',
  border: '1px solid #ECECEC',
  borderRadius: 4,
};

const vsplit = <VSplit />;
const hsplit = <HSplit />;

const onDragStart = function () {
  document.body.classList.add('dragging');
};

const onDragEnd = function () {
  document.body.classList.remove('dragging');
};

class Layout extends Component {
  render() {
    const {
      goFullScreen,
      showLeftPanel,
      showDownPanel,
      downPanelInRight,
      downPanel,
      leftPanel,
      preview,
    } = this.props;
    let previewStyle = normalPreviewStyle;

    if (goFullScreen) {
      previewStyle = fullScreenPreviewStyle;
    }

    const leftPanelDefaultSize = showLeftPanel ? 250 : 1;
    let downPanelDefaultSize = 1;
    if (showDownPanel) {
      downPanelDefaultSize = downPanelInRight ? 400 : 200;
    }

    return (
      <div style={rootStyle}>
        <SplitPane
          split="vertical"
          minSize={leftPanelDefaultSize}
          defaultSize={leftPanelDefaultSize}
          resizerChildren={vsplit}
          onDragStarted={onDragStart}
          onDragFinished={onDragEnd}
        >
          <div style={leftPanelStyle}>
            {showLeftPanel ? leftPanel() : null}
          </div>

          <SplitPane
            split={downPanelInRight ? 'vertical' : 'horizontal'}
            primary="second"
            minSize={downPanelInRight ? 200 : 100}
            defaultSize={downPanelDefaultSize}
            resizerChildren={downPanelInRight ? vsplit : hsplit}
            onDragStarted={onDragStart}
            onDragFinished={onDragEnd}
          >
            <div style={contentPanelStyle}>
              <div style={previewStyle}>
                {preview()}
              </div>
            </div>
            <div style={downPanelStyle}>
              {showDownPanel ? downPanel() : null}
            </div>
          </SplitPane>
        </SplitPane>
      </div>
    );
  }
}

Layout.propTypes = {
  showLeftPanel: PropTypes.bool.isRequired,
  showDownPanel: PropTypes.bool.isRequired,
  goFullScreen: PropTypes.bool.isRequired,
  leftPanel: PropTypes.func.isRequired,
  preview: PropTypes.func.isRequired,
  downPanel: PropTypes.func.isRequired,
  downPanelInRight: PropTypes.bool.isRequired,
};

export default Layout;
