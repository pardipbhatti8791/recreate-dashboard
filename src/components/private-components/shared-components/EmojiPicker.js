import React, { useState } from 'react';
import { Picker } from 'emoji-mart';

export default function EmojiPicker({
  dispatch,
  post_description,
  setNewPostDescription
}) {
  /**
   * * @react state
   */
  const [showEmoji, setShowEmoji] = useState(false);

  /**
   * * @instance of picker
   */
  let emojiPicker = new Picker();

  /**
   * Add Emoji to description
   * @param {*} e
   */
  const addEmoji = e => {
    let emoji = e.native;
    dispatch(setNewPostDescription(post_description + emoji));
  };

  /**
   * Show Emojis
   * @param {*} e
   */
  const showEmojis = e => {
    setShowEmoji(true);
    document.addEventListener('click', closeMenu);
  };

  /**
   * Handle Close Emoji Picker
   * @param {*} e
   */
  const closeMenu = e => {
    if (emojiPicker !== null) {
      setShowEmoji(false);
      document.removeEventListener('click', closeMenu);
    }
  };

  return (
    <span onClick={() => closeMenu}>
      {showEmoji ? (
        <span style={styles.emojiPicker} ref={el => (emojiPicker = el)}>
          <Picker
            onSelect={addEmoji}
            emojiTooltip={true}
            showPreview={false}
            showSkinTones={false}
            darkMode={false}
            skin={3}
            native={true}
          />
        </span>
      ) : (
        <p style={styles.getEmojiButton} onClick={showEmojis}>
          {String.fromCodePoint(0x1f60a)}
        </p>
      )}
    </span>
  );
}

/**
 * Emoji Styles
 */
const styles = {
  getEmojiButton: {
    cssFloat: 'right',
    border: 'none',
    margin: 0,
    cursor: 'pointer'
  },
  emojiPicker: {
    position: 'absolute',
    bottom: 'auto',
    right: 0,
    cssFloat: 'right',
    marginLeft: '200px',
    top: 0,
    zIndex: 2
  }
};
