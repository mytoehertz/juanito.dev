import React, { useState } from 'react';

// Default ingredient database with costs per unit
const defaultIngredients = {
  // Spirits (per oz)
  spirits: [
    { id: 'vodka', name: 'Vodka', cost: 0.75, unit: 'oz' },
    { id: 'gin', name: 'Gin', cost: 0.85, unit: 'oz' },
    { id: 'rum', name: 'Rum', cost: 0.70, unit: 'oz' },
    { id: 'tequila', name: 'Tequila', cost: 0.90, unit: 'oz' },
    { id: 'whiskey', name: 'Whiskey', cost: 1.00, unit: 'oz' },
    { id: 'bourbon', name: 'Bourbon', cost: 1.10, unit: 'oz' },
  ],
  // Mixers (per oz)
  mixers: [
    { id: 'simple-syrup', name: 'Simple Syrup', cost: 0.10, unit: 'oz' },
    { id: 'soda-water', name: 'Soda Water', cost: 0.05, unit: 'oz' },
    { id: 'tonic', name: 'Tonic Water', cost: 0.08, unit: 'oz' },
    { id: 'cola', name: 'Cola', cost: 0.06, unit: 'oz' },
    { id: 'ginger-beer', name: 'Ginger Beer', cost: 0.12, unit: 'oz' },
    { id: 'coconut-water', name: 'Coconut Water', cost: 0.15, unit: 'oz' },
    { id: 'cream', name: 'Heavy Cream', cost: 0.20, unit: 'oz' },
    { id: 'milk', name: 'Milk', cost: 0.08, unit: 'oz' },
    { id: 'oat-milk', name: 'Oat Milk', cost: 0.15, unit: 'oz' },
  ],
  // Juices (per oz)
  juices: [
    { id: 'lime', name: 'Lime Juice', cost: 0.25, unit: 'oz' },
    { id: 'lemon', name: 'Lemon Juice', cost: 0.20, unit: 'oz' },
    { id: 'orange', name: 'Orange Juice', cost: 0.12, unit: 'oz' },
    { id: 'pineapple', name: 'Pineapple Juice', cost: 0.10, unit: 'oz' },
    { id: 'cranberry', name: 'Cranberry Juice', cost: 0.08, unit: 'oz' },
    { id: 'grapefruit', name: 'Grapefruit Juice', cost: 0.15, unit: 'oz' },
  ],
  // Syrups & Flavors (per oz)
  syrups: [
    { id: 'vanilla-syrup', name: 'Vanilla Syrup', cost: 0.15, unit: 'oz' },
    { id: 'caramel-syrup', name: 'Caramel Syrup', cost: 0.15, unit: 'oz' },
    { id: 'hazelnut-syrup', name: 'Hazelnut Syrup', cost: 0.15, unit: 'oz' },
    { id: 'lavender-syrup', name: 'Lavender Syrup', cost: 0.20, unit: 'oz' },
    { id: 'grenadine', name: 'Grenadine', cost: 0.12, unit: 'oz' },
    { id: 'honey', name: 'Honey', cost: 0.18, unit: 'oz' },
    { id: 'agave', name: 'Agave', cost: 0.15, unit: 'oz' },
  ],
  // Coffee (per oz)
  coffee: [
    { id: 'espresso', name: 'Espresso', cost: 0.35, unit: 'oz' },
    { id: 'cold-brew', name: 'Cold Brew Concentrate', cost: 0.25, unit: 'oz' },
    { id: 'drip-coffee', name: 'Drip Coffee', cost: 0.08, unit: 'oz' },
  ],
  // Garnishes & Extras (per piece/unit)
  garnishes: [
    { id: 'lime-wedge', name: 'Lime Wedge', cost: 0.08, unit: 'pc' },
    { id: 'lemon-wedge', name: 'Lemon Wedge', cost: 0.06, unit: 'pc' },
    { id: 'orange-slice', name: 'Orange Slice', cost: 0.10, unit: 'pc' },
    { id: 'cherry', name: 'Maraschino Cherry', cost: 0.15, unit: 'pc' },
    { id: 'mint', name: 'Fresh Mint', cost: 0.12, unit: 'sprig' },
    { id: 'whipped-cream', name: 'Whipped Cream', cost: 0.10, unit: 'oz' },
    { id: 'ice', name: 'Ice', cost: 0.02, unit: 'oz' },
  ],
};

const drinkCategories = [
  { id: 'cocktail', name: 'Cocktails', icon: '🍸', color: '#E07A5F' },
  { id: 'mocktail', name: 'Mocktails', icon: '🍹', color: '#81B29A' },
  { id: 'refresher', name: 'Refreshers', icon: '🧊', color: '#5DADE2' },
  { id: 'coffee', name: 'Coffee', icon: '☕', color: '#8B5A2B' },
  { id: 'specialty', name: 'Specialty Drinks', icon: '✨', color: '#9B59B6' },
  { id: 'dirty-soda', name: 'Dirty Sodas', icon: '🥤', color: '#E74C3C' },
];

const BeverageCalculator = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [ingredients, setIngredients] = useState(defaultIngredients);
  const [showIngredientEditor, setShowIngredientEditor] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('cocktail');
  const [drinkName, setDrinkName] = useState('');
  const [recipeItems, setRecipeItems] = useState([]);
  const [targetMargin, setTargetMargin] = useState(75);
  const [wastePercentage, setWastePercentage] = useState(5);
  const [laborCost, setLaborCost] = useState(0.50);
  const [cupCost, setCupCost] = useState(0.15);

  // Calculate total ingredient cost
  const ingredientCost = recipeItems.reduce((sum, item) => sum + (item.cost * item.quantity), 0);
  
  // Calculate waste cost
  const wasteCost = ingredientCost * (wastePercentage / 100);
  
  // Calculate total cost
  const totalCost = ingredientCost + wasteCost + laborCost + cupCost;
  
  // Calculate suggested price based on target margin
  const suggestedPrice = totalCost / (1 - targetMargin / 100);
  
  // Calculate actual margin at different price points
  const calculateMargin = (price) => ((price - totalCost) / price) * 100;

  // Add ingredient to recipe
  const addIngredient = (ingredient, category) => {
    const existing = recipeItems.find(item => item.id === ingredient.id);
    if (existing) {
      setRecipeItems(recipeItems.map(item => 
        item.id === ingredient.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setRecipeItems([...recipeItems, { ...ingredient, quantity: 1, category }]);
    }
  };

  // Update ingredient quantity
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setRecipeItems(recipeItems.filter(item => item.id !== id));
    } else {
      setRecipeItems(recipeItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  // Update ingredient cost in database
  const updateIngredientCost = (category, id, newCost) => {
    setIngredients(prev => ({
      ...prev,
      [category]: prev[category].map(ing => 
        ing.id === id ? { ...ing, cost: parseFloat(newCost) || 0 } : ing
      )
    }));
    // Also update any items in the current recipe
    setRecipeItems(prev => prev.map(item => 
      item.id === id ? { ...item, cost: parseFloat(newCost) || 0 } : item
    ));
  };

  const theme = {
    bg: darkMode ? '#0a0a1e' : '#FDF8F3',
    card: darkMode ? '#1a1a3e' : '#FFFFFF',
    cardBorder: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    text: darkMode ? '#FDF8F3' : '#3D2914',
    textMuted: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(61,41,20,0.7)',
    accent: '#E07A5F',
    accentGreen: '#81B29A',
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
            🥤 Beverage Program Calculator
          </h1>
          <p style={{ fontSize: '0.875rem', color: theme.textMuted, marginTop: '0.25rem' }}>
            Calculate costs, pricing, and margins for your drink menu
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

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 350px', gap: '1.5rem' }}>
          
          {/* Left Column - Ingredient Selector */}
          <div style={{ 
            background: theme.card, 
            borderRadius: '1rem',
            border: `2px solid ${theme.cardBorder}`,
            padding: '1.5rem',
            height: 'fit-content'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: '600' }}>Ingredients</h2>
              <button
                onClick={() => setShowIngredientEditor(!showIngredientEditor)}
                style={{
                  background: showIngredientEditor ? theme.accent : 'transparent',
                  color: showIngredientEditor ? 'white' : theme.textMuted,
                  border: `1px solid ${showIngredientEditor ? theme.accent : theme.cardBorder}`,
                  borderRadius: '0.5rem',
                  padding: '0.375rem 0.75rem',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                {showIngredientEditor ? '✓ Editing Costs' : '✏️ Edit Costs'}
              </button>
            </div>

            {Object.entries(ingredients).map(([category, items]) => (
              <div key={category} style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ 
                  fontSize: '0.75rem', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em',
                  color: theme.textMuted,
                  marginBottom: '0.5rem'
                }}>
                  {category.replace('-', ' ')}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {items.map(ing => (
                    <div key={ing.id} style={{ position: 'relative' }}>
                      {showIngredientEditor ? (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          background: darkMode ? 'rgba(255,255,255,0.05)' : '#f5f5f5',
                          borderRadius: '0.5rem',
                          padding: '0.375rem 0.5rem',
                          fontSize: '0.75rem'
                        }}>
                          <span>{ing.name}</span>
                          <span style={{ color: theme.textMuted }}>$</span>
                          <input
                            type="number"
                            step="0.01"
                            value={ing.cost}
                            onChange={(e) => updateIngredientCost(category, ing.id, e.target.value)}
                            style={{
                              width: '50px',
                              background: darkMode ? 'rgba(255,255,255,0.1)' : 'white',
                              border: `1px solid ${theme.cardBorder}`,
                              borderRadius: '0.25rem',
                              padding: '0.125rem 0.25rem',
                              fontSize: '0.75rem',
                              color: theme.text
                            }}
                          />
                          <span style={{ color: theme.textMuted }}>/{ing.unit}</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => addIngredient(ing, category)}
                          style={{
                            background: darkMode ? 'rgba(255,255,255,0.05)' : '#f5f5f5',
                            border: `1px solid ${theme.cardBorder}`,
                            borderRadius: '0.5rem',
                            padding: '0.375rem 0.75rem',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            color: theme.text,
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = theme.accent;
                            e.target.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = darkMode ? 'rgba(255,255,255,0.05)' : '#f5f5f5';
                            e.target.style.color = theme.text;
                          }}
                        >
                          {ing.name}
                          <span style={{ color: theme.textMuted, marginLeft: '0.25rem' }}>
                            ${ing.cost.toFixed(2)}/{ing.unit}
                          </span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Middle Column - Recipe Builder */}
          <div style={{ 
            background: theme.card, 
            borderRadius: '1rem',
            border: `2px solid ${theme.cardBorder}`,
            padding: '1.5rem'
          }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Recipe Builder</h2>
            
            {/* Drink Category */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.75rem', color: theme.textMuted, display: 'block', marginBottom: '0.5rem' }}>
                Category
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {drinkCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      background: selectedCategory === cat.id ? cat.color : 'transparent',
                      color: selectedCategory === cat.id ? 'white' : theme.text,
                      border: `2px solid ${cat.color}`,
                      borderRadius: '2rem',
                      padding: '0.5rem 1rem',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Drink Name */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.75rem', color: theme.textMuted, display: 'block', marginBottom: '0.5rem' }}>
                Drink Name
              </label>
              <input
                type="text"
                value={drinkName}
                onChange={(e) => setDrinkName(e.target.value)}
                placeholder="e.g., Coconut Cold Brew"
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

            {/* Recipe Items */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.75rem', color: theme.textMuted, display: 'block', marginBottom: '0.5rem' }}>
                Ingredients ({recipeItems.length})
              </label>
              
              {recipeItems.length === 0 ? (
                <div style={{ 
                  padding: '2rem', 
                  textAlign: 'center', 
                  color: theme.textMuted,
                  background: darkMode ? 'rgba(255,255,255,0.02)' : '#fafafa',
                  borderRadius: '0.5rem',
                  border: `2px dashed ${theme.cardBorder}`
                }}>
                  <p>Click ingredients on the left to add them</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {recipeItems.map(item => (
                    <div 
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.75rem',
                        background: darkMode ? 'rgba(255,255,255,0.05)' : '#f9f9f9',
                        borderRadius: '0.5rem',
                        border: `1px solid ${theme.cardBorder}`
                      }}
                    >
                      <span style={{ fontWeight: '500' }}>{item.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 0.5)}
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              border: `1px solid ${theme.cardBorder}`,
                              background: 'transparent',
                              cursor: 'pointer',
                              color: theme.text
                            }}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseFloat(e.target.value) || 0)}
                            style={{
                              width: '50px',
                              textAlign: 'center',
                              background: 'transparent',
                              border: 'none',
                              fontSize: '0.875rem',
                              color: theme.text
                            }}
                          />
                          <span style={{ color: theme.textMuted, fontSize: '0.75rem' }}>{item.unit}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 0.5)}
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              border: `1px solid ${theme.cardBorder}`,
                              background: 'transparent',
                              cursor: 'pointer',
                              color: theme.text
                            }}
                          >
                            +
                          </button>
                        </div>
                        <span style={{ 
                          fontWeight: '600', 
                          color: theme.accent,
                          minWidth: '50px',
                          textAlign: 'right'
                        }}>
                          ${(item.cost * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 0)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            opacity: 0.5
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Additional Costs */}
            <div style={{ 
              padding: '1rem',
              background: darkMode ? 'rgba(255,255,255,0.03)' : '#f5f5f5',
              borderRadius: '0.5rem',
              marginBottom: '1rem'
            }}>
              <h3 style={{ fontSize: '0.75rem', color: theme.textMuted, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Additional Costs
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: theme.textMuted, display: 'block', marginBottom: '0.25rem' }}>
                    Labor Cost
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span style={{ color: theme.textMuted }}>$</span>
                    <input
                      type="number"
                      step="0.05"
                      value={laborCost}
                      onChange={(e) => setLaborCost(parseFloat(e.target.value) || 0)}
                      style={{
                        width: '80px',
                        background: darkMode ? 'rgba(255,255,255,0.1)' : 'white',
                        border: `1px solid ${theme.cardBorder}`,
                        borderRadius: '0.25rem',
                        padding: '0.375rem',
                        fontSize: '0.875rem',
                        color: theme.text
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: theme.textMuted, display: 'block', marginBottom: '0.25rem' }}>
                    Cup/Packaging
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span style={{ color: theme.textMuted }}>$</span>
                    <input
                      type="number"
                      step="0.05"
                      value={cupCost}
                      onChange={(e) => setCupCost(parseFloat(e.target.value) || 0)}
                      style={{
                        width: '80px',
                        background: darkMode ? 'rgba(255,255,255,0.1)' : 'white',
                        border: `1px solid ${theme.cardBorder}`,
                        borderRadius: '0.25rem',
                        padding: '0.375rem',
                        fontSize: '0.875rem',
                        color: theme.text
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Waste Percentage */}
            <div>
              <label style={{ fontSize: '0.75rem', color: theme.textMuted, display: 'block', marginBottom: '0.5rem' }}>
                Waste Factor: {wastePercentage}%
              </label>
              <input
                type="range"
                min="0"
                max="20"
                value={wastePercentage}
                onChange={(e) => setWastePercentage(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: theme.accent }}
              />
              <p style={{ fontSize: '0.75rem', color: theme.textMuted, marginTop: '0.25rem' }}>
                Accounts for spillage, mistakes, and product expiration
              </p>
            </div>
          </div>

          {/* Right Column - Pricing & Analysis */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Cost Breakdown */}
            <div style={{ 
              background: theme.card, 
              borderRadius: '1rem',
              border: `2px solid ${theme.cardBorder}`,
              padding: '1.5rem'
            }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Cost Breakdown</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: theme.textMuted }}>Ingredients</span>
                  <span>${ingredientCost.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: theme.textMuted }}>Waste ({wastePercentage}%)</span>
                  <span>${wasteCost.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: theme.textMuted }}>Labor</span>
                  <span>${laborCost.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: theme.textMuted }}>Cup/Packaging</span>
                  <span>${cupCost.toFixed(2)}</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  borderTop: `2px solid ${theme.cardBorder}`,
                  paddingTop: '0.5rem',
                  marginTop: '0.5rem',
                  fontWeight: '600'
                }}>
                  <span>Total Cost</span>
                  <span style={{ color: theme.accent }}>${totalCost.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Target Margin */}
            <div style={{ 
              background: theme.card, 
              borderRadius: '1rem',
              border: `2px solid ${theme.cardBorder}`,
              padding: '1.5rem'
            }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Target Margin</h2>
              
              <label style={{ fontSize: '0.75rem', color: theme.textMuted, display: 'block', marginBottom: '0.5rem' }}>
                Desired Profit Margin: {targetMargin}%
              </label>
              <input
                type="range"
                min="50"
                max="90"
                value={targetMargin}
                onChange={(e) => setTargetMargin(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: theme.accentGreen }}
              />
              
              <div style={{ 
                marginTop: '1rem',
                padding: '1rem',
                background: darkMode ? 'rgba(129, 178, 154, 0.1)' : 'rgba(129, 178, 154, 0.15)',
                borderRadius: '0.5rem',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '0.75rem', color: theme.textMuted, marginBottom: '0.25rem' }}>
                  Suggested Menu Price
                </p>
                <p style={{ fontSize: '2rem', fontWeight: '700', color: theme.accentGreen }}>
                  ${suggestedPrice.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Price Scenarios */}
            <div style={{ 
              background: theme.card, 
              borderRadius: '1rem',
              border: `2px solid ${theme.cardBorder}`,
              padding: '1.5rem'
            }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Price Scenarios</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[suggestedPrice - 1, suggestedPrice - 0.5, suggestedPrice, suggestedPrice + 0.5, suggestedPrice + 1].map(price => {
                  const margin = calculateMargin(price);
                  const profit = price - totalCost;
                  return (
                    <div 
                      key={price}
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.5rem',
                        background: price === suggestedPrice 
                          ? darkMode ? 'rgba(129, 178, 154, 0.1)' : 'rgba(129, 178, 154, 0.15)'
                          : 'transparent',
                        borderRadius: '0.375rem'
                      }}
                    >
                      <span style={{ fontWeight: price === suggestedPrice ? '600' : '400' }}>
                        ${price.toFixed(2)}
                      </span>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem' }}>
                        <span style={{ color: theme.textMuted }}>
                          {margin.toFixed(1)}% margin
                        </span>
                        <span style={{ 
                          color: profit > 0 ? theme.accentGreen : theme.accent,
                          fontWeight: '500'
                        }}>
                          ${profit.toFixed(2)} profit
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Clear Recipe */}
            <button
              onClick={() => {
                setRecipeItems([]);
                setDrinkName('');
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
        
        @media (max-width: 1024px) {
          main > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BeverageCalculator;