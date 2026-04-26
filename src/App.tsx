import { useState } from 'react'
import './App.css'

const LAYOUT = [
  [
    {l:'Esc',c:'KC_ESC'},{l:'1',s:'!',c:'KC_1'},{l:'2',s:'@',c:'KC_2'},{l:'3',s:'#',c:'KC_3'},{l:'4',s:'$',c:'KC_4'},
    {l:'5',s:'%',c:'KC_5'},{l:'6',s:'^',c:'KC_6'},{l:'7',s:'&',c:'KC_7'},{l:'8',s:'*',c:'KC_8'},{l:'9',s:'(',c:'KC_9'},
    {l:'0',s:')',c:'KC_0'},{l:'-',s:'_',c:'KC_MINS'},{l:'=',s:'+',c:'KC_EQL'},
    {l:'Bksp',c:'KC_BSPC',w:'w200'},{l:'`',s:'~',c:'KC_GRV'},
  ],
  [
    {l:'Tab',c:'KC_TAB',w:'w150'},{l:'Q',c:'KC_Q'},{l:'W',c:'KC_W'},{l:'E',c:'KC_E'},
    {l:'R',c:'KC_R'},{l:'T',c:'KC_T'},{l:'Y',c:'KC_Y'},{l:'U',c:'KC_U'},{l:'I',c:'KC_I'},
    {l:'O',c:'KC_O'},{l:'P',c:'KC_P'},{l:'[',s:'{',c:'KC_LBRC'},{l:']',s:'}',c:'KC_RBRC'},
    {l:'\\',s:'|',c:'KC_BSLS',w:'w150'},{l:'Del',c:'KC_DEL'},
  ],
  [
    {l:'Caps',c:'KC_CAPS',w:'w175'},{l:'A',c:'KC_A'},{l:'S',c:'KC_S'},{l:'D',c:'KC_D'},
    {l:'F',c:'KC_F'},{l:'G',c:'KC_G'},{l:'H',c:'KC_H'},{l:'J',c:'KC_J'},{l:'K',c:'KC_K'},
    {l:'L',c:'KC_L'},{l:';',s:':',c:'KC_SCLN'},{l:"'",s:'"',c:'KC_QUOT'},{l:'Enter',c:'KC_ENT',w:'w235'},{l:'PgU',c:'KC_PGUP'},
  ],
  [
    {l:'Shift',c:'KC_LSFT',w:'w235'},{l:'Z',c:'KC_Z'},{l:'X',c:'KC_X'},{l:'C',c:'KC_C'},
    {l:'V',c:'KC_V'},{l:'B',c:'KC_B'},{l:'N',c:'KC_N'},{l:'M',c:'KC_M'},
    {l:',',s:'<',c:'KC_COMM'},{l:'.',s:'>',c:'KC_DOT'},{l:'/',s:'?',c:'KC_SLSH'},
    {l:'Shift',c:'KC_RSFT',w:'w175'},{l:'↑',c:'KC_UP'},{l:'PgD',c:'KC_PGDN'},
  ],
  [
    {l:'Ctrl',c:'KC_LCTL',w:'w125'},{l:'Win',c:'KC_LGUI',w:'w125'},{l:'Alt',c:'KC_LALT',w:'w125'},
    {l:'Space',c:'KC_SPC',w:'w675'},{l:'Alt',c:'KC_RALT'},{l:'Fn',c:'KC_FN0'},
    {l:'Ctrl',c:'KC_RCTL'},{l:'←',c:'KC_LEFT'},{l:'↓',c:'KC_DOWN'},{l:'→',c:'KC_RGHT'},
  ],
]

const KEYCODES = [
  {l:'A',c:'KC_A'},{l:'B',c:'KC_B'},{l:'C',c:'KC_C'},{l:'D',c:'KC_D'},{l:'E',c:'KC_E'},
  {l:'F',c:'KC_F'},{l:'G',c:'KC_G'},{l:'H',c:'KC_H'},{l:'I',c:'KC_I'},{l:'J',c:'KC_J'},
  {l:'K',c:'KC_K'},{l:'L',c:'KC_L'},{l:'M',c:'KC_M'},{l:'N',c:'KC_N'},{l:'O',c:'KC_O'},
  {l:'P',c:'KC_P'},{l:'Q',c:'KC_Q'},{l:'R',c:'KC_R'},{l:'S',c:'KC_S'},{l:'T',c:'KC_T'},
  {l:'U',c:'KC_U'},{l:'V',c:'KC_V'},{l:'W',c:'KC_W'},{l:'X',c:'KC_X'},{l:'Y',c:'KC_Y'},
  {l:'Z',c:'KC_Z'},

  {l:'1',c:'KC_1'},{l:'2',c:'KC_2'},{l:'3',c:'KC_3'},{l:'4',c:'KC_4'},{l:'5',c:'KC_5'},
  {l:'6',c:'KC_6'},{l:'7',c:'KC_7'},{l:'8',c:'KC_8'},{l:'9',c:'KC_9'},{l:'0',c:'KC_0'},

  {l:'Enter',c:'KC_ENT'},{l:'Escape',c:'KC_ESC'},{l:'Backspace',c:'KC_BSPC'},
  {l:'Tab',c:'KC_TAB'},{l:'Space',c:'KC_SPC'},{l:'Delete',c:'KC_DEL'},
  {l:'Minus -',c:'KC_MINS'},{l:'Equal =',c:'KC_EQL'},{l:'Left Bracket [',c:'KC_LBRC'},
  {l:'Right Bracket ]',c:'KC_RBRC'},{l:'Backslash \\',c:'KC_BSLS'},
  {l:'Semicolon ;',c:'KC_SCLN'},{l:'Quote \'',c:'KC_QUOT'},{l:'Grave `',c:'KC_GRV'},
  {l:'Comma ,',c:'KC_COMM'},{l:'Period .',c:'KC_DOT'},{l:'Slash /',c:'KC_SLSH'},

  {l:'Caps Lock',c:'KC_CAPS'},{l:'Left Shift',c:'KC_LSFT'},{l:'Right Shift',c:'KC_RSFT'},
  {l:'Left Ctrl',c:'KC_LCTL'},{l:'Right Ctrl',c:'KC_RCTL'},
  {l:'Left Alt',c:'KC_LALT'},{l:'Right Alt',c:'KC_RALT'},
  {l:'Left GUI',c:'KC_LGUI'},{l:'Right GUI',c:'KC_RGUI'},

  {l:'Up',c:'KC_UP'},{l:'Down',c:'KC_DOWN'},{l:'Left',c:'KC_LEFT'},{l:'Right',c:'KC_RGHT'},
  {l:'Home',c:'KC_HOME'},{l:'End',c:'KC_END'},{l:'Page Up',c:'KC_PGUP'},{l:'Page Down',c:'KC_PGDN'},
  {l:'Insert',c:'KC_INS'},{l:'Print Screen',c:'KC_PSCR'},{l:'Scroll Lock',c:'KC_SCRL'},
  {l:'Pause',c:'KC_PAUS'},{l:'Num Lock',c:'KC_NUM'},

  {l:'F1',c:'KC_F1'},{l:'F2',c:'KC_F2'},{l:'F3',c:'KC_F3'},{l:'F4',c:'KC_F4'},
  {l:'F5',c:'KC_F5'},{l:'F6',c:'KC_F6'},{l:'F7',c:'KC_F7'},{l:'F8',c:'KC_F8'},
  {l:'F9',c:'KC_F9'},{l:'F10',c:'KC_F10'},{l:'F11',c:'KC_F11'},{l:'F12',c:'KC_F12'},
  {l:'F13',c:'KC_F13'},{l:'F14',c:'KC_F14'},{l:'F15',c:'KC_F15'},{l:'F16',c:'KC_F16'},
  {l:'F17',c:'KC_F17'},{l:'F18',c:'KC_F18'},{l:'F19',c:'KC_F19'},{l:'F20',c:'KC_F20'},
  {l:'F21',c:'KC_F21'},{l:'F22',c:'KC_F22'},{l:'F23',c:'KC_F23'},{l:'F24',c:'KC_F24'},

  {l:'Num 0',c:'KC_P0'},{l:'Num 1',c:'KC_P1'},{l:'Num 2',c:'KC_P2'},{l:'Num 3',c:'KC_P3'},
  {l:'Num 4',c:'KC_P4'},{l:'Num 5',c:'KC_P5'},{l:'Num 6',c:'KC_P6'},{l:'Num 7',c:'KC_P7'},
  {l:'Num 8',c:'KC_P8'},{l:'Num 9',c:'KC_P9'},{l:'Num .',c:'KC_PDOT'},{l:'Num +',c:'KC_PPLS'},
  {l:'Num -',c:'KC_PMNS'},{l:'Num *',c:'KC_PAST'},{l:'Num /',c:'KC_PSLS'},{l:'Num Enter',c:'KC_PENT'},
  {l:'Num =',c:'KC_PEQL'},

  {l:'Vol Up',c:'KC_VOLU'},{l:'Vol Down',c:'KC_VOLD'},{l:'Mute',c:'KC_MUTE'},
  {l:'Play/Pause',c:'KC_MPLY'},{l:'Next Track',c:'KC_MNXT'},{l:'Prev Track',c:'KC_MPRV'},
  {l:'Stop',c:'KC_MSTP'},{l:'Media Select',c:'KC_MSEL'},{l:'Eject',c:'KC_EJCT'},

  {l:'Mouse Btn 1',c:'KC_BTN1'},{l:'Mouse Btn 2',c:'KC_BTN2'},{l:'Mouse Btn 3',c:'KC_BTN3'},
  {l:'Mouse Up',c:'KC_MS_U'},{l:'Mouse Down',c:'KC_MS_D'},{l:'Mouse Left',c:'KC_MS_L'},
  {l:'Mouse Right',c:'KC_MS_R'},{l:'Mouse Whl Up',c:'KC_WH_U'},{l:'Mouse Whl Down',c:'KC_WH_D'},

  {l:'Power',c:'KC_PWR'},{l:'Sleep',c:'KC_SLEP'},{l:'Wake',c:'KC_WAKE'},
  {l:'Calculator',c:'KC_CALC'},{l:'Mail',c:'KC_MAIL'},{l:'Browser Home',c:'KC_WHOM'},
  {l:'Browser Back',c:'KC_WBAK'},{l:'Browser Fwd',c:'KC_WFWD'},{l:'Browser Refresh',c:'KC_WREF'},

  {l:'No Op',c:'KC_NO'},{l:'Transparent',c:'KC_TRNS'},{l:'Reset',c:'QK_BOOT'},
  {l:'Debug',c:'DB_TOGG'},{l:'EEPROM Reset',c:'EE_CLR'},
]

const TABS = [
  { id: 'letters', label: 'ABC' },
  { id: 'numbers', label: '123' },
  { id: 'symbols', label: '!@#' },
  { id: 'modifiers', label: 'Modifiers' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'function', label: 'Function' },
  { id: 'numpad', label: 'Number Pad' },
  { id: 'media', label: 'Media' },
  { id: 'mouse', label: 'Mouse' },
  { id: 'system', label: 'System' },
  { id: 'special', label: 'QMK' },
]

const KEYCODE_MAP: Record<string, typeof KEYCODES> = {
  letters: KEYCODES.filter(k => /^KC_[A-Z]$/.test(k.c)),
  numbers: KEYCODES.filter(k => /^KC_[0-9]$/.test(k.c)),
  symbols: KEYCODES.filter(k => ['KC_MINS','KC_EQL','KC_LBRC','KC_RBRC','KC_BSLS','KC_SCLN','KC_QUOT','KC_GRV','KC_COMM','KC_DOT','KC_SLSH'].includes(k.c)),
  modifiers: KEYCODES.filter(k => ['KC_LSFT','KC_RSFT','KC_LCTL','KC_RCTL','KC_LALT','KC_RALT','KC_LGUI','KC_RGUI','KC_CAPS'].includes(k.c)),
  navigation: KEYCODES.filter(k => ['KC_UP','KC_DOWN','KC_LEFT','KC_RGHT','KC_HOME','KC_END','KC_PGUP','KC_PGDN','KC_INS','KC_DEL','KC_PSCR','KC_SCRL','KC_PAUS','KC_NUM'].includes(k.c)),
  function: KEYCODES.filter(k => /^KC_F\d+$/.test(k.c)),
  numpad: KEYCODES.filter(k => /^KC_P/.test(k.c)),
  media: KEYCODES.filter(k => ['KC_VOLU','KC_VOLD','KC_MUTE','KC_MPLY','KC_MNXT','KC_MPRV','KC_MSTP','KC_MSEL','KC_EJCT'].includes(k.c)),
  mouse: KEYCODES.filter(k => k.c.startsWith('KC_BTN') || k.c.startsWith('KC_MS') || k.c.startsWith('KC_WH')),
  system: KEYCODES.filter(k => ['KC_PWR','KC_SLEP','KC_WAKE','KC_CALC','KC_MAIL','KC_WHOM','KC_WBAK','KC_WFWD','KC_WREF'].includes(k.c)),
  special: KEYCODES.filter(k => ['KC_NO','KC_TRNS','QK_BOOT','DB_TOGG','EE_CLR'].includes(k.c)),
}

type KeyDef = { l: string; c: string; w?: string; s?: string }
type SelectedKey = { rowIndex: number; keyIndex: number }

type Keymap = {
  [layer: number]: {
    [rowIndex: number]: {
      [keyIndex: number]: KeyDef
    }
  }
}

const LAYERS = ['0 — base', '1 — fn', '2 — media']

export default function App() {
  const [activeLayer, setActiveLayer] = useState(0)
  const [activeTab, setActiveTab] = useState('letters')
  const [selected, setSelected] = useState<SelectedKey | null>(null)
  const [search, setSearch] = useState('')
  const [keymap, setKeymap] = useState<Keymap>({})

  function getKey(layer: number, ri: number, ki: number): KeyDef {
    return keymap[layer]?.[ri]?.[ki] ?? LAYOUT[ri][ki]
  }

  function assignKeycode(label: string, code: string) {
    if (!selected) return
    const { rowIndex: ri, keyIndex: ki } = selected
    const shortLabel = label.length > 5 ? label.slice(0, 4) : label
    setKeymap(prev => ({
      ...prev,
      [activeLayer]: {
        ...prev[activeLayer],
        [ri]: {
          ...prev[activeLayer]?.[ri],
          [ki]: { ...getKey(activeLayer, ri, ki), l: shortLabel, c: code },
        },
      },
    }))
  }

  const selectedKey = selected ? getKey(activeLayer, selected.rowIndex, selected.keyIndex) : null

  return (
    <div className="app">
      {/* Top bar */}
      <div className="topbar">
        <div className="logo">exion<span>KE</span></div>
        <div className="top-actions">
          <button className="btn">import layout</button>
          <button className="btn">save keymap</button>
          <button className="btn primary">⚡ flash</button>
        </div>
      </div>

      {/* Layer bar */}
      <div className="layer-bar">
        <span className="layer-label">LAYER</span>
        {LAYERS.map((name, i) => (
          <button
            key={i}
            className={`layer-tab${activeLayer === i ? ' active' : ''}`}
            onClick={() => { setActiveLayer(i); setSelected(null) }}
          >
            {name}
          </button>
        ))}
        <button className="layer-tab">+ add</button>
      </div>

      {/* Main area */}
      <div className="main">
        <div className="canvas-area">
          <div className="keyboard">
            {LAYOUT.map((row, ri) => (
              <div key={ri} className="kb-row">
                {row.map((_, ki) => {
                  const key = getKey(activeLayer, ri, ki)
                  const isSelected = selected?.rowIndex === ri && selected?.keyIndex === ki
                  return (
                    <div
                      key={ki}
                      className={`key${key.w ? ' ' + key.w : ''}${isSelected ? ' selected' : ''}`}
                      onClick={() => setSelected({ rowIndex: ri, keyIndex: ki })}
                    >
                      <div className="key-shift">{key.s}</div>
                      <div className={`key-main${key.s ? ' has-shift' : ''}`}>{key.l}</div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-title">SELECTED KEY</div>
            {selectedKey ? (
              <div className="selected-key-info">
                <div className="key-preview">{selectedKey.l}</div>
                <div className="key-name">{selectedKey.l}</div>
                <div className="key-code">{selectedKey.c}</div>
              </div>
            ) : (
              <div className="empty-state">click a key to edit</div>
            )}
          </div>

          <div className="sidebar-section sidebar-keycodes">
            <div className="sidebar-title">ASSIGN KEYCODE</div>
            <div className="kc-tabs">
              {TABS.map(t => (
                <button
                  key={t.id}
                  className={`kc-tab${activeTab === t.id ? ' active' : ''}`}
                  onClick={() => { setActiveTab(t.id); setSearch('') }}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="kc-search-row">
              <input
                className="kc-search"
                placeholder="search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button className="btn kc-back" onClick={() => { setSearch(''); setActiveTab('letters') }}>←</button>
            </div>
            <div className="keycode-list">
              {(search ? KEYCODES.filter(k =>
                k.l.toLowerCase().includes(search.toLowerCase()) ||
                k.c.toLowerCase().includes(search.toLowerCase())
              ) : KEYCODE_MAP[activeTab] ?? []).map((k, i) => (
                <div key={i} className="keycode-item" onClick={() => assignKeycode(k.l, k.c)}>
                  <span className="kc-label">{k.l}</span>
                  <span className="kc-code">{k.c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="status-bar">
        <span><span className="status-dot" />tkl — 87 keys</span>
        <span>layer {activeLayer} active</span>
        <span>no device connected</span>
      </div>
    </div>
  )
}
