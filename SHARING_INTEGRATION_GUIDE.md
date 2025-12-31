# QUICK SHARING INTEGRATION GUIDE

## You already have sharing in:
- ✅ StoichiometryScreen.js  
- ✅ PhCalc.js

## To add sharing to the remaining screens, follow this pattern:

### Step 1: Add imports at the top

```javascript
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ShareManager } from './ShareManager';
```

### Step 2: Add the share button in the solution section

Add this code RIGHT BEFORE the closing `</View>` or `</Animated.View>` of your solution/answer container:

```javascript
{/* Share Button */}
<TouchableOpacity 
  style={styles.shareButton}
  onPress={() => ShareManager.shareCalculation(
    'SCREEN_NAME_HERE',  // e.g., 'Nuclear Chemistry'
    item.question,
    item.solution.answer
  )}
  activeOpacity={0.8}
>
  <MaterialCommunityIcons name="share-variant" size={20} color="#YOUR_THEME_COLOR" />
  <Text style={styles.shareButtonText}>Share Solution</Text>
</TouchableOpacity>
```

### Step 3: Add these styles to your stylesheet

Add this to the `StyleSheet.create({...})` section:

```javascript
shareButton: {
  marginTop: 16,
  backgroundColor: '#FFFFFF',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 14,
  borderRadius: 12,
  borderWidth: 2,
  borderColor: '#YOUR_THEME_COLOR',  // Match your screen's primary color
  gap: 8,
  elevation: 3,
  shadowColor: '#YOUR_THEME_COLOR',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
},
shareButtonText: {
  color: '#YOUR_THEME_COLOR',
  fontSize: 15,
  fontWeight: 'bold',
},
```

---

## Screens that need sharing added:

### 1. NuclearChemistry.js
- Theme color: `#FFC107` (yellow/gold)
- Add button after line ~350 (in solution section)

### 2. Electrolysis.js  
- Theme color: `#673AB7` (purple)
- Add button after line ~350

### 3. GasesScreen.js
- Theme color: `#8BC34A` (green)
- Add button in the solution display area

###  4. MassMoleNumberScreen.js
- Theme color: `#90CAF9` (light blue)
- Add button in results section

### 5. SolutionChemistryScreen.js
- Theme color: `#4DB6AC` (teal)
- Add button in solution area

### 6. ThemoChem.js
- Theme color: `#F44336` (red)
- Add button in answer section

### 7. ChemistryCalculatorScreen.js
- Theme color: `#A855F7` (purple)
- Add button for each calculation result

---

## For Quiz and Balancer:

### QuizScreen.js - Add after quiz completion:
```javascript
<TouchableOpacity 
  style={styles.shareButton}
  onPress={() => ShareManager.shareQuizScore(score, questionsAnswered)}
>
  <MaterialCommunityIcons name="share-variant" size={20} color="#00eaff" />
  <Text>Share Score</Text>
</TouchableOpacity>
```

### EquationBalancerScreen.js - Add after showing balanced equation:
```javascript
<TouchableOpacity 
  style={styles.shareButton}
  onPress={() => ShareManager.shareBalancedEquation(input, result)}
>
  <MaterialCommunityIcons name="share-variant" size={20} color="#00FFFF" />
  <Text>Share Equation</Text>
</TouchableOpacity>
```

---

## Quick Copy-Paste Template

Replace `THEME_COLOR` with the screen's color and `SCREEN_NAME` with the actual screen name:

```javascript
// At top with other imports
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ShareManager } from './ShareManager';

// In solution section (before closing tag)
<TouchableOpacity 
  style={styles.shareButton}
  onPress={() => ShareManager.shareCalculation('SCREEN_NAME', item.question, item.solution.answer)}
  activeOpacity={0.8}
>
  <MaterialCommunityIcons name="share-variant" size={20} color="THEME_COLOR" />
  <Text style={styles.shareButtonText}>Share Solution</Text>
</TouchableOpacity>

// In styles
shareButton: {
  marginTop: 16,
  backgroundColor: '#FFFFFF',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 14,
  borderRadius: 12,
  borderWidth: 2,
  borderColor: 'THEME_COLOR',
  gap: 8,
  elevation: 3,
  shadowColor: 'THEME_COLOR',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
},
shareButtonText: {
  color: 'THEME_COLOR',
  fontSize: 15,
  fontWeight: 'bold',
},
```

---

## Testing

After adding to each screen:
1. Run the app
2. Solve a problem
3. Tap the "Share Solution" button  
4. Verify the share dialog opens with proper content

**Each screen takes about 2 minutes to update!**
