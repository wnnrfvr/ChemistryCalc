import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";

const { width, height } = Dimensions.get("window");

// Random glowing colors for energy particles
const randomColor = () => {
  const colors = ["#00eaff", "#ff007f", "#ffd700", "#7fff00", "#ff6600"];
  return colors[Math.floor(Math.random() * colors.length)];
};

// --- Particle Renderer ---
const Particle = ({ body }) => {
  const { x, y } = body.position;
  const radius = body.circleRadius;
  const color = body.render.fillStyle;
  const glow = {
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
  };

  return (
    <View
      style={[
        {
          position: "absolute",
          left: x - radius,
          top: y - radius,
          width: radius * 2,
          height: radius * 2,
          borderRadius: radius,
          backgroundColor: color,
        },
        glow,
      ]}
    />
  );
};

// --- Physics Update System ---
const Physics = (entities, { time }) => {
  if (!entities.physics?.engine) return entities;
  Matter.Engine.update(entities.physics.engine, time.delta);
  return entities;
};

const RadioactivitySimulation = () => {
  const [running, setRunning] = useState(true);
  const [entities, setEntities] = useState(null);

  useEffect(() => {
    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;
    world.gravity.y = 0;

    // Static boundary walls
    const wallOptions = { isStatic: true };
    const walls = [
      Matter.Bodies.rectangle(width / 2, 0, width, 20, wallOptions),
      Matter.Bodies.rectangle(width / 2, height - 250, width, 20, wallOptions),
      Matter.Bodies.rectangle(0, height / 2 - 100, 20, height, wallOptions),
      Matter.Bodies.rectangle(width, height / 2 - 100, 20, height, wallOptions),
    ];
    Matter.World.add(world, walls);

    // Initial radioactive particles
    const unstableAtoms = Array.from({ length: 5 }).map((_, i) => {
      const atom = Matter.Bodies.circle(
        Math.random() * (width - 100) + 50,
        Math.random() * (height - 400) + 150,
        25,
        {
          restitution: 1,
          friction: 0,
          frictionAir: 0,
          render: { fillStyle: "#FF0000" },
        }
      );
      Matter.World.add(world, atom);
      Matter.Body.setVelocity(atom, {
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 8,
      });
      return { body: atom, name: `atom_${i}` };
    });

    const allEntities = { physics: { engine, world } };
    unstableAtoms.forEach((a) => {
      allEntities[a.name] = { body: a.body, renderer: Particle };
    });

    setEntities(allEntities);
  }, []);

  // 💥 Simulate radioactive decay
  const triggerDecay = () => {
    if (!entities) return;

    Object.keys(entities).forEach((key) => {
      if (key.startsWith("atom_")) {
        const atom = entities[key].body;

        // Remove the original atom
        Matter.World.remove(entities.physics.world, atom);

        // Spawn smaller energetic particles (decay fragments)
        for (let i = 0; i < 3; i++) {
          const fragment = Matter.Bodies.circle(
            atom.position.x,
            atom.position.y,
            10,
            {
              restitution: 1,
              friction: 0,
              frictionAir: 0,
              render: { fillStyle: randomColor() },
            }
          );
          Matter.World.add(entities.physics.world, fragment);
          Matter.Body.setVelocity(fragment, {
            x: (Math.random() - 0.5) * 20,
            y: (Math.random() - 0.5) * 20,
          });
          entities[`fragment_${atom.id}_${i}`] = {
            body: fragment,
            renderer: Particle,
          };
        }

        delete entities[key]; // Remove decayed atom
      }
    });
  };

  // ⚡ Add new radioactive atom
  const addAtom = () => {
    if (!entities) return;
    const atom = Matter.Bodies.circle(
      Math.random() * (width - 100) + 50,
      Math.random() * (height - 400) + 150,
      25,
      {
        restitution: 1,
        friction: 0,
        frictionAir: 0,
        render: { fillStyle: "#FF0000" },
      }
    );
    Matter.World.add(entities.physics.world, atom);
    entities[`atom_${atom.id}`] = { body: atom, renderer: Particle };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>☢️ Radioactive Decay Simulation</Text>
      <Text style={styles.subtitle}>Tap buttons to experiment</Text>

      {entities ? (
        <GameEngine
          style={styles.simulationBox}
          systems={[Physics]}
          entities={entities}
          running={running}
        />
      ) : (
        <View style={[styles.simulationBox, { justifyContent: "center" }]}>
          <Text style={{ color: "#00eaff" }}>Initializing nuclear chamber...</Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={triggerDecay}>
        <Text style={styles.buttonText}>Trigger Radioactive Decay</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondary]} onPress={addAtom}>
        <Text style={styles.buttonText}>Add Unstable Atom</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.pause]}
        onPress={() => setRunning(!running)}
      >
        <Text style={styles.buttonText}>
          {running ? "Pause Simulation" : "Resume Simulation"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050b16",
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    color: "#00eaff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    color: "#8899aa",
    fontSize: 14,
    marginBottom: 16,
  },
  simulationBox: {
    width: width * 0.9,
    height: height * 0.55,
    backgroundColor: "#111a2e",
    borderWidth: 2,
    borderColor: "#00eaff",
    borderRadius: 15,
    overflow: "hidden",
  },
  button: {
    backgroundColor: "#00eaff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 15,
  },
  secondary: {
    backgroundColor: "#ff007f",
  },
  pause: {
    backgroundColor: "#004d66",
  },
  buttonText: {
    color: "#0a0f1c",
    fontWeight: "bold",
  },
});

export default RadioactivitySimulation;
