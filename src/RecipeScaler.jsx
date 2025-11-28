import React, { useState } from 'react';

// Unit conversion factors (all relative to ml for volume, grams for weight)
const unitConversions = {
  // Volume
  ml: { factor: 1, type: 'volume', display: 'ml' },
  l: { factor: 1000, type: 'volume', display: 'L' },
  oz: { factor: 29.5735, type: 'volume', display: 'oz' },
  cup: { factor: 236.588, type: 'volume', display: 'cup' },
  tbsp: { factor: 14.787, type: 'volume', display: 'tbsp' },
  tsp: { factor: 4.929, type: 'volume', display: 'tsp' },
  pint: { factor: 473.176, type: 'volume', display: 'pint' },
  quart: { factor: 946.353, type: 'volume', display: 'quart' },
  gallon: { factor: 3785.41, type: 'volume', display: 'gallon' },
  // Count
  pc: { factor: 1, type: 'count', display: 'pc' },
  dozen: { factor: 12, type: 'count', display: 'dozen' },
  // Weight
  g: { factor: 1, type: 'weight', display: 'g' },
  kg: { factor: 1000, type: 'weight', display: 'kg' },
  lb: { factor: 453.592, type: 'weight', display: 'lb' },
};

const volumeUnits = ['ml', 'l', 'oz', 'cup', 'tbsp', 'tsp', 'pint', 'quart', 'gallon'];
const countUnits = ['pc', 'dozen'];
const weightUnits = ['g', 'kg', 'lb'];

const RecipeScaler = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState([
    { id: 1, name: '', amount: '', unit: 'oz' }
  ]);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [targetServings, setTargetServings] = useState(10);
  const [baseServings, setBaseServings] = useState(1);
  const [scaleMode, setScaleMode] = useState('factor'); // 'factor' or 'servings'
  const [outputUnit, setOutputUnit] = useState('same'); // 'same' or specific unit
  const [copied, setCopied] = useState(false);

  // Calculate actual scale factor
  const actualScale = scaleMode === 'factor' ? scaleFactor : targetServings / baseServings;

  // Add new ingredient row
  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: Date.now(), name: '', amount: '', unit: 'oz' }
    ]);
  };

  // Update ingredient
  const updateIngredient = (id, field, value) => {
    setIngredients(ingredients.map(ing => 
      ing.id === id ? { ...ing, [field]: value } : ing
    ));
  };

  // Remove ingredient
  const removeIngredient = (id) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter(ing => ing.id !== id));
    }
  };

  // Convert between units of the same type
  const convertUnit = (amount, fromUnit, toUnit) => {
    const from = unitConversions[fromUnit];
    const to = unitConversions[toUnit];
    
    if (!from || !to || from.type !== to.type) {
      return { amount: amount * actualScale, unit: fromUnit };
    }
    
    // Convert to base unit, then to target
    const inBase = amount * from.factor;
    const converted = inBase / to.factor;
    
    return { amount: converted * actualScale, unit: toUnit };
  };

  // Format number nicely
  const formatAmount = (num) => {
    if (num === 0) return '0';
    if (num < 0.01) return num.toExponential(2);
    if (num < 1) return num.toFixed(2);
    if (num < 10) return num.toFixed(2);
    if (num < 100) return num.toFixed(1);
    return Math.round(num).toString();
  };

  // Get scaled ingredients
  const getScaledIngredients = () => {
    return ingredients
      .filter(ing => ing.name.trim() !== '')
      .map(ing => {
        const amount = parseFloat(ing.amount) || 0;
        
        if (outputUnit === 'same') {
          return {
            ...ing,
            scaledAmount: formatAmount(amount * actualScale),
            scaledUnit: ing.unit
          };
        } else {
          const fromType = unitConversions[ing.unit]?.type;
          const toType = unitConversions[outputUnit]?.type;
          
          if (fromType === toType) {
            const converted = convertUnit(amount, ing.unit, outputUnit);
            return {
              ...ing,
              scaledAmount: formatAmount(converted.amount),
              scaledUnit: outputUnit
            };
          } else {
            return {
              ...ing,
              scaledAmount: formatAmount(amount * actualScale),
              scaledUnit: ing.unit
            };
          }
        }
      });
  };

  // Generate copyable output
  const generateOutput = () => {
    const scaled = getScaledIngredients();
    const header = recipeName ? `${recipeName} (x${actualScale.toFixed(1)})\n${'='.repeat(40)}\n\n` : '';
    const ingredientList = scaled.map(ing => 
      `${ing.scaledAmount} ${unitConversions[ing.scaledUnit]?.display || ing.scaledUnit} - ${ing.name}`
    ).join('\n');
    
    return header + ingredientList;
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateOutput());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const theme = {
    bg: darkMode ? '#0a0a1e' : '#FDF8F3',
    card: darkMode ? '#1a1a3e' : '#FFFFFF',
    cardBorder: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    text: darkMode ? '#FDF8F3' : '#3D2914',
    textMuted: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(61,41,20,0.7)',
    accent: '#E07A5F',
    accentGreen: '#81B29A',
    accentBlue: '#5DADE2',
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: theme.bg,
      color: theme.text,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      {/* Header */}
      <header style={{ 
        padding: '1.5rem 2rem',
        borderBottom: `1px solid ${theme.cardBorder}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: theme.card
      }}>
        <div>
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '600',
            fontFamily: "'Instrument Serif', Georgia, serif",
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📐 Recipe Scaler
          </h1>
          <p style={{ fontSize: '0.875rem', color: theme.textMuted, marginTop: '0.25rem' }}>
            Scale single drinks to batches with easy unit conversion
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a 
            href="https://juanito.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              fontSize: '0.875rem', 
              color: theme.accent,
              textDecoration: 'none'
            }}
          >
            ← Back to juanito.dev
          </a>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              background: 'transparent',
              border: `2px solid ${theme.cardBorder}`,
              borderRadius: '0.5rem',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem' }}>
          
          {/* Left Column - Recipe Input */}
          <div style={{ 
            background: theme.card, 
            borderRadius: '1rem',
            border: `2px solid ${theme.cardBorder}`,
            padding: '1.5rem'
          }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem' }}>Original Recipe</h2>
            
            {/* Recipe Name */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.75rem', color: theme.textMuted, display: 'block', marginBottom: '0.5rem' }}>
                Recipe Name (optional)
              </label>
              <input
                type="text"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                placeholder="e.g., Spicy Margarita"
                style={{
                  width: '100%',
                  background: darkMode ? 'rgba(255,255,255,0.05)' : '#f9f9f9',
                  border: `2px solid ${theme.cardBorder}`,
                  borderRadius: '0.5rem',
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  color: theme.text
                }}
              />
            </div>

            {/* Ingredients List */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.75rem', color: theme.textMuted, display: 'block', marginBottom: '0.5rem' }}>
                Ingredients
              </label>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {ingredients.map((ing) => (
                  <div 
                    key={ing.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '80px 100px 1fr 40px',
                      gap: '0.5rem',
                      alignItems: 'center'
                    }}
                  >
                    <input
                      type="number"
                      step="0.25"
                      value={ing.amount}
                      onChange={(e) => updateIngredient(ing.id, 'amount', e.target.value)}
                      placeholder="2"
                      style={{
                        background: darkMode ? 'rgba(255,255,255,0.05)' : '#f9f9f9',
                        border: `2px solid ${theme.cardBorder}`,
                        borderRadius: '0.5rem',
                        padding: '0.75rem',
                        fontSize: '0.875rem',
                        color: theme.text,
                        textAlign: 'center'
                      }}
                    />
                    <select
                      value={ing.unit}
                      onChange={(e) => updateIngredient(ing.id, 'unit', e.target.value)}
                      style={{
                        background: darkMode ? 'rgba(255,255,255,0.05)' : '#f9f9f9',
                        border: `2px solid ${theme.cardBorder}`,
                        borderRadius: '0.5rem',
                        padding: '0.75rem',
                        fontSize: '0.875rem',
                        color: theme.text
                      }}
                    >
                      <optgroup label="Volume">
                        {volumeUnits.map(u => (
                          <option key={u} value={u}>{unitConversions[u].display}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Count">
                        {countUnits.map(u => (
                          <option key={u} value={u}>{unitConversions[u].display}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Weight">
                        {weightUnits.map(u => (
                          <option key={u} value={u}>{unitConversions[u].display}</option>
                        ))}
                      </optgroup>
                    </select>
                    <input
                      type="text"
                      value={ing.name}
                      onChange={(e) => updateIngredient(ing.id, 'name', e.target.value)}
                      placeholder="Ingredient name"
                      style={{
                        background: darkMode ? 'rgba(255,255,255,0.05)' : '#f9f9f9',
                        border: `2px solid ${theme.cardBorder}`,
                        borderRadius: '0.5rem',
                        padding: '0.75rem',
                        fontSize: '0.875rem',
                        color: theme.text
                      }}
                    />
                    <button
                      onClick={() => removeIngredient(ing.id)}
                      disabled={ingredients.length === 1}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: ingredients.length === 1 ? 'not-allowed' : 'pointer',
                        opacity: ingredients.length === 1 ? 0.3 : 0.6,
                        fontSize: '1.25rem'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              
              <button
                onClick={addIngredient}
                style={{
                  marginTop: '0.75rem',
                  background: 'transparent',
                  border: `2px dashed ${theme.cardBorder}`,
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  width: '100%',
                  cursor: 'pointer',
                  color: theme.textMuted,
                  fontSize: '0.875rem'
                }}
              >
                + Add Ingredient
              </button>
            </div>

            {/* Scale Controls */}
            <div style={{ 
              marginTop: '2rem',
              padding: '1.5rem',
              background: darkMode ? 'rgba(255,255,255,0.03)' : '#f5f5f5',
              borderRadius: '0.75rem'
            }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '1rem' }}>Scale Method</h3>
              
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <button
                  onClick={() => setScaleMode('factor')}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: `2px solid ${scaleMode === 'factor' ? theme.accent : theme.cardBorder}`,
                    background: scaleMode === 'factor' ? theme.accent : 'transparent',
                    color: scaleMode === 'factor' ? 'white' : theme.text,
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  By Multiplier
                </button>
                <button
                  onClick={() => setScaleMode('servings')}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: `2px solid ${scaleMode === 'servings' ? theme.accent : theme.cardBorder}`,
                    background: scaleMode === 'servings' ? theme.accent : 'transparent',
                    color: scaleMode === 'servings' ? 'white' : theme.text,
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  By Servings
                </button>
              </div>

              {scaleMode === 'factor' ? (
                <div>
                  <label style={{ fontSize: '0.75rem', color: theme.textMuted, display: 'block', marginBottom: '0.5rem' }}>
                    Scale Factor: {scaleFactor}x
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={scaleFactor}
                    onChange={(e) => setScaleFactor(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: theme.accent }}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                    {[1, 5, 10, 20, 50].map(n => (
                      <button
                        key={n}
                        onClick={() => setScaleFactor(n)}
                        style={{
                          flex: 1,
                          padding: '0.5rem',
                          borderRadius: '0.375rem',
                          border: `1px solid ${scaleFactor === n ? theme.accent : theme.cardBorder}`,
                          background: scaleFactor === n ? theme.accent : 'transparent',
                          color: scaleFactor === n ? 'white' : theme.textMuted,
                          cursor: 'pointer',
                          fontSize: '0.75rem'
                        }}
                      >
                        {n}x
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.5rem', alignItems: 'center' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: theme.textMuted, display: 'block', marginBottom: '0.25rem' }}>
                      Base Servings
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={baseServings}
                      onChange={(e) => setBaseServings(parseInt(e.target.value) || 1)}
                      style={{
                        width: '100%',
                        background: darkMode ? 'rgba(255,255,255,0.1)' : 'white',
                        border: `2px solid ${theme.cardBorder}`,
                        borderRadius: '0.5rem',
                        padding: '0.75rem',
                        fontSize: '1rem',
                        color: theme.text,
                        textAlign: 'center'
                      }}
                    />
                  </div>
                  <span style={{ color: theme.textMuted, paddingTop: '1.25rem' }}>→</span>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: theme.textMuted, display: 'block', marginBottom: '0.25rem' }}>
                      Target Servings
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={targetServings}
                      onChange={(e) => setTargetServings(parseInt(e.target.value) || 1)}
                      style={{
                        width: '100%',
                        background: darkMode ? 'rgba(255,255,255,0.1)' : 'white',
                        border: `2px solid ${theme.cardBorder}`,
                        borderRadius: '0.5rem',
                        padding: '0.75rem',
                        fontSize: '1rem',
                        color: theme.text,
                        textAlign: 'center'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Output Unit Preference */}
            <div style={{ marginTop: '1.5rem' }}>
              <label style={{ fontSize: '0.75rem', color: theme.textMuted, display: 'block', marginBottom: '0.5rem' }}>
                Output Units
              </label>
              <select
                value={outputUnit}
                onChange={(e) => setOutputUnit(e.target.value)}
                style={{
                  width: '100%',
                  background: darkMode ? 'rgba(255,255,255,0.05)' : '#f9f9f9',
                  border: `2px solid ${theme.cardBorder}`,
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  fontSize: '0.875rem',
                  color: theme.text
                }}
              >
                <option value="same">Keep Original Units</option>
                <optgroup label="Convert Volume To">
                  {volumeUnits.map(u => (
                    <option key={u} value={u}>{unitConversions[u].display}</option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* Right Column - Output */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Scale Info */}
            <div style={{ 
              background: darkMode ? 'rgba(224, 122, 95, 0.1)' : 'rgba(224, 122, 95, 0.15)',
              borderRadius: '1rem',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '0.75rem', color: theme.textMuted, marginBottom: '0.25rem' }}>
                Scaling by
              </p>
              <p style={{ fontSize: '2.5rem', fontWeight: '700', color: theme.accent }}>
                {actualScale.toFixed(1)}x
              </p>
              {scaleMode === 'servings' && (
                <p style={{ fontSize: '0.875rem', color: theme.textMuted, marginTop: '0.25rem' }}>
                  {baseServings} → {targetServings} servings
                </p>
              )}
            </div>

            {/* Scaled Recipe Output */}
            <div style={{ 
              background: theme.card, 
              borderRadius: '1rem',
              border: `2px solid ${theme.cardBorder}`,
              padding: '1.5rem',
              flex: 1
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: '600' }}>Scaled Recipe</h2>
                <button
                  onClick={copyToClipboard}
                  style={{
                    background: copied ? theme.accentGreen : theme.accent,
                    border: 'none',
                    borderRadius: '0.5rem',
                    padding: '0.5rem 1rem',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: '500'
                  }}
                >
                  {copied ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>

              {getScaledIngredients().length === 0 ? (
                <div style={{ 
                  padding: '3rem 1rem', 
                  textAlign: 'center', 
                  color: theme.textMuted,
                  background: darkMode ? 'rgba(255,255,255,0.02)' : '#fafafa',
                  borderRadius: '0.5rem',
                  border: `2px dashed ${theme.cardBorder}`
                }}>
                  <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📝</p>
                  <p>Add ingredients to see scaled output</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {getScaledIngredients().map((ing) => (
                    <div 
                      key={ing.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem',
                        background: darkMode ? 'rgba(255,255,255,0.03)' : '#f9f9f9',
                        borderRadius: '0.5rem'
                      }}
                    >
                      <span style={{ 
                        fontWeight: '700', 
                        fontSize: '1.125rem',
                        color: theme.accent,
                        minWidth: '60px'
                      }}>
                        {ing.scaledAmount}
                      </span>
                      <span style={{ 
                        color: theme.textMuted,
                        minWidth: '50px',
                        fontSize: '0.875rem'
                      }}>
                        {unitConversions[ing.scaledUnit]?.display || ing.scaledUnit}
                      </span>
                      <span style={{ flex: 1 }}>{ing.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Copyable Text Output */}
              {getScaledIngredients().length > 0 && (
                <div style={{ marginTop: '1.5rem' }}>
                  <label style={{ fontSize: '0.75rem', color: theme.textMuted, display: 'block', marginBottom: '0.5rem' }}>
                    Plain Text Output
                  </label>
                  <textarea
                    readOnly
                    value={generateOutput()}
                    style={{
                      width: '100%',
                      height: '150px',
                      background: darkMode ? 'rgba(0,0,0,0.3)' : '#1a1a1a',
                      border: 'none',
                      borderRadius: '0.5rem',
                      padding: '1rem',
                      fontSize: '0.75rem',
                      fontFamily: 'monospace',
                      color: '#81B29A',
                      resize: 'none'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Quick Reference */}
            <div style={{ 
              background: theme.card, 
              borderRadius: '1rem',
              border: `2px solid ${theme.cardBorder}`,
              padding: '1.5rem'
            }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '1rem' }}>Quick Reference</h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem',
                fontSize: '0.75rem',
                color: theme.textMuted
              }}>
                <div>1 oz = 29.6 ml</div>
                <div>1 cup = 8 oz</div>
                <div>1 tbsp = 0.5 oz</div>
                <div>1 pint = 16 oz</div>
                <div>1 quart = 32 oz</div>
                <div>1 gallon = 128 oz</div>
              </div>
            </div>

            {/* Clear */}
            <button
              onClick={() => {
                setIngredients([{ id: 1, name: '', amount: '', unit: 'oz' }]);
                setRecipeName('');
                setScaleFactor(1);
              }}
              style={{
                background: 'transparent',
                border: `2px solid ${theme.cardBorder}`,
                borderRadius: '0.5rem',
                padding: '0.75rem',
                color: theme.textMuted,
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              🗑️ Clear Recipe
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ 
        padding: '2rem',
        textAlign: 'center',
        color: theme.textMuted,
        fontSize: '0.875rem',
        borderTop: `1px solid ${theme.cardBorder}`
      }}>
        <p>Built by <a href="https://juanito.dev" style={{ color: theme.accent }}>Juan Hernandez</a> · Free to use for your beverage program</p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          opacity: 1;
        }
        
        @media (max-width: 900px) {
          main > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default RecipeScaler;