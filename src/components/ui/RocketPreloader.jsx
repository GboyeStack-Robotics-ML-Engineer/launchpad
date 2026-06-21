import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const RocketPreloader = ({ onComplete }) => {
  const mountRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [logText, setLogText] = useState('SYSTEM INITIALIZATION...');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 1. Scene Setup
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    // Deep dark space blue background, transitioning to space black later
    scene.background = new THREE.Color(0x0a0a16);
    scene.fog = new THREE.FogExp2(0x0a0a16, 0.08);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 1, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Glowing flame light at the engine base
    const flameLight = new THREE.PointLight(0xff5500, 0, 15);
    flameLight.position.set(0, -2, 0);
    scene.add(flameLight);

    // 3. Rocket Construction (Group)
    const rocket = new THREE.Group();

    // Body (Fuselage)
    const bodyGeom = new THREE.CylinderGeometry(0.5, 0.5, 3, 16);
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.8,
      roughness: 0.15,
      name: 'metal'
    });
    const bodyMesh = new THREE.Mesh(bodyGeom, metalMat);
    bodyMesh.castShadow = true;
    rocket.add(bodyMesh);

    // Nose Cone
    const noseGeom = new THREE.ConeGeometry(0.5, 1.2, 16);
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0xff5a36, // LaunchPad Orange
      metalness: 0.5,
      roughness: 0.2
    });
    const noseMesh = new THREE.Mesh(noseGeom, accentMat);
    noseMesh.position.y = 2.1;
    noseMesh.castShadow = true;
    rocket.add(noseMesh);

    // Engine Nozzle
    const engineGeom = new THREE.CylinderGeometry(0.4, 0.25, 0.5, 12);
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x1e1e2f,
      metalness: 0.9,
      roughness: 0.4
    });
    const engineMesh = new THREE.Mesh(engineGeom, darkMetalMat);
    engineMesh.position.y = -1.75;
    rocket.add(engineMesh);

    // Fins (3 fins distributed around the base)
    const finGeom = new THREE.BoxGeometry(0.1, 0.8, 0.8);
    const fins = [];
    for (let i = 0; i < 3; i++) {
      const angle = (i * 2 * Math.PI) / 3;
      const fin = new THREE.Mesh(finGeom, accentMat);
      fin.position.set(Math.cos(angle) * 0.5, -1.3, Math.sin(angle) * 0.5);
      fin.rotation.y = -angle;
      fin.rotation.z = 0.1;
      fin.castShadow = true;
      rocket.add(fin);
      fins.push(fin);
    }

    // Windows (Sleek futuristic rings/circles)
    const winGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.05, 16);
    const winMat = new THREE.MeshStandardMaterial({ color: 0x00d2ff, emissive: 0x005577, roughness: 0.1 });
    const winMesh = new THREE.Mesh(winGeom, winMat);
    winMesh.rotation.x = Math.PI / 2;
    winMesh.position.set(0, 0.5, 0.48);
    rocket.add(winMesh);

    scene.add(rocket);

    // 4. Launchpad/Ground Platform
    const launchpadGroup = new THREE.Group();
    const padGeom = new THREE.CylinderGeometry(4, 4.2, 0.3, 32);
    const padMat = new THREE.MeshStandardMaterial({ color: 0x222530, roughness: 0.7, metalness: 0.2 });
    const padMesh = new THREE.Mesh(padGeom, padMat);
    padMesh.position.y = -2.15;
    padMesh.receiveShadow = true;
    launchpadGroup.add(padMesh);

    // Support pillars
    const pillarGeom = new THREE.CylinderGeometry(0.15, 0.15, 4, 8);
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0x3a3f50, roughness: 0.6 });
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const pillar = new THREE.Mesh(pillarGeom, pillarMat);
      pillar.position.set(Math.cos(angle) * 3, -4, Math.sin(angle) * 3);
      pillar.castShadow = true;
      launchpadGroup.add(pillar);
    }
    scene.add(launchpadGroup);

    // 5. Particles: Starfield (Background stars)
    const starsCount = 400;
    const starGeom = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starsCount * 3);
    const starSpeeds = new Float32Array(starsCount);

    for (let i = 0; i < starsCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 30; // x
      starPositions[i * 3 + 1] = Math.random() * 40 - 20; // y
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5; // z
      starSpeeds[i] = 0.05 + Math.random() * 0.15;
    }

    starGeom.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.8
    });
    const starField = new THREE.Points(starGeom, starMat);
    scene.add(starField);

    // 6. Particles: Flame Thrust & Smoke
    const flames = [];
    const smokes = [];

    const flameGeom = new THREE.DodecahedronGeometry(0.15);
    const flameMat = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });

    const smokeGeom = new THREE.SphereGeometry(0.25, 8, 8);
    const smokeMat = new THREE.MeshBasicMaterial({
      color: 0xe0e5f0,
      transparent: true,
      opacity: 0.25
    });

    // Helper to spawn dynamic engine particles
    const spawnThrust = (intensity) => {
      // Spawn flame
      const count = Math.ceil(intensity * 3);
      for (let i = 0; i < count; i++) {
        const flameMesh = new THREE.Mesh(flameGeom, flameMat.clone());
        // Set scale & position under rocket nozzle
        flameMesh.position.set(
          rocket.position.x + (Math.random() - 0.5) * 0.3,
          rocket.position.y - 1.9,
          rocket.position.z + (Math.random() - 0.5) * 0.3
        );
        flameMesh.userData = {
          vx: (Math.random() - 0.5) * 0.4,
          vy: -2.5 - Math.random() * 3, // fast downwards
          vz: (Math.random() - 0.5) * 0.4,
          life: 1.0,
          decay: 0.04 + Math.random() * 0.04
        };
        scene.add(flameMesh);
        flames.push(flameMesh);
      }

      // Spawn puff of smoke
      if (Math.random() < 0.6 * intensity) {
        const smokeMesh = new THREE.Mesh(smokeGeom, smokeMat.clone());
        smokeMesh.position.set(
          rocket.position.x + (Math.random() - 0.5) * 0.5,
          rocket.position.y - 2.0 - Math.random() * 0.5,
          rocket.position.z + (Math.random() - 0.5) * 0.5
        );
        smokeMesh.userData = {
          vx: (Math.random() - 0.5) * 0.8,
          vy: -0.2 - Math.random() * 0.5, // drifts slowly
          vz: (Math.random() - 0.5) * 0.8,
          life: 1.0,
          decay: 0.015 + Math.random() * 0.015,
          scaleSpeed: 1.01 + Math.random() * 0.02
        };
        scene.add(smokeMesh);
        smokes.push(smokeMesh);
      }
    };

    // 7. Animation State Variables
    let time = 0;
    let cameraShake = 0;
    const clock = new THREE.Clock();

    // 8. Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      time += delta;

      // Stage handling:
      // Stage 0: 0s to 1.5s -> Ignition sequence (shake, smoke builds, rocket stays on pad)
      // Stage 1: 1.5s to 4.5s -> Liftoff and acceleration (rocket goes up, stars speed up, space fog dims)
      // Stage 2: 4.5s onwards -> Fadeout trigger

      let progressPct = 0;
      let stage = 0;

      if (time < 1.5) {
        // Ignition phase
        stage = 0;
        progressPct = Math.floor((time / 1.5) * 35);
        cameraShake = (time / 1.5) * 0.08; // build shaking rumble
        flameLight.intensity = (time / 1.5) * 6;

        // Pulse the orange glow
        flameLight.color.setHSL(0.05 + Math.sin(time * 30) * 0.03, 1, 0.5);

        spawnThrust(time / 1.5);
      } else if (time < 4.2) {
        // Ascent phase
        stage = 1;
        const liftTime = time - 1.5;
        progressPct = 35 + Math.floor((liftTime / 2.7) * 55);

        // Rocket accelerates upwards quadratically
        rocket.position.y = Math.pow(liftTime, 2) * 1.5;
        flameLight.position.y = rocket.position.y - 2;
        flameLight.intensity = 8 + Math.sin(time * 20) * 2;

        // Camera shakes slightly on liftoff then smooths out as it moves up
        cameraShake = Math.max(0, 0.08 - liftTime * 0.03);

        // Camera follows the rocket trailing behind
        camera.position.y = rocket.position.y * 0.85 + 1.0;
        camera.lookAt(new THREE.Vector3(0, rocket.position.y + 0.5, 0));

        // Speed up the starfield
        const speedMultiplier = 1 + liftTime * 6;
        const positions = starField.geometry.attributes.position.array;
        for (let i = 0; i < starsCount; i++) {
          positions[i * 3 + 1] -= starSpeeds[i] * speedMultiplier * delta * 60;
          if (positions[i * 3 + 1] < camera.position.y - 20) {
            positions[i * 3 + 1] = camera.position.y + 20;
          }
        }
        starField.geometry.attributes.position.needsUpdate = true;

        // Transition background color to deep black space
        const skyMix = Math.min(1, liftTime / 2.5);
        const skyColor = new THREE.Color(0x0a0a16).lerp(new THREE.Color(0x010103), skyMix);
        scene.background = skyColor;
        scene.fog.color = skyColor;

        spawnThrust(1.0);
      } else {
        // Establishing orbit/completion phase
        stage = 2;
        progressPct = 90 + Math.min(10, Math.floor((time - 4.2) * 15));
        rocket.position.y = Math.pow(4.2 - 1.5, 2) * 1.5 + (time - 4.2) * 20; // shoot away
        flameLight.intensity *= 0.9;

        // Camera trails off
        camera.position.y = Math.min(15, camera.position.y + delta * 2);

        // Fast stars
        const positions = starField.geometry.attributes.position.array;
        for (let i = 0; i < starsCount; i++) {
          positions[i * 3 + 1] -= starSpeeds[i] * 35 * delta * 60;
          if (positions[i * 3 + 1] < camera.position.y - 20) {
            positions[i * 3 + 1] = camera.position.y + 20;
          }
        }
        starField.geometry.attributes.position.needsUpdate = true;

        spawnThrust(0.5);
      }

      // Constrain progress at 100
      progressPct = Math.min(100, progressPct);
      setProgress(progressPct);

      // Update log text based on progress percentages
      if (progressPct < 20) {
        setLogText('SYSTEM INITIALIZATION...');
      } else if (progressPct < 35) {
        setLogText('IGNITION SEQUENCE START...');
      } else if (progressPct < 60) {
        setLogText('LIFTOFF! ENGINE THRUST STABLE.');
      } else if (progressPct < 85) {
        setLogText('ASCENDING THROUGH ATMOSPHERE...');
      } else if (progressPct < 98) {
        setLogText('ESTABLISHING ORBITAL INCLINATION...');
      } else {
        setLogText('LAUNCHPAD LAUNCH SEQUENCE COMPLETE.');
      }

      // Apply camera shake rumble
      if (cameraShake > 0) {
        camera.position.x += (Math.random() - 0.5) * cameraShake;
        camera.position.y += (Math.random() - 0.5) * cameraShake;
      }

      // Gentle rocket roll/tilt
      if (stage === 1) {
        rocket.rotation.z = Math.sin(time * 3) * 0.02;
        rocket.rotation.y = time * 0.15;
      } else {
        rocket.rotation.y = time * 0.05;
      }

      // Update flame particles
      for (let i = flames.length - 1; i >= 0; i--) {
        const f = flames[i];
        f.position.x += f.userData.vx * delta;
        f.position.y += f.userData.vy * delta;
        f.position.z += f.userData.vz * delta;
        f.userData.life -= f.userData.decay;

        f.scale.setScalar(f.userData.life);
        f.material.opacity = f.userData.life;

        if (f.userData.life <= 0) {
          scene.remove(f);
          f.geometry.dispose();
          f.material.dispose();
          flames.splice(i, 1);
        }
      }

      // Update smoke particles
      for (let i = smokes.length - 1; i >= 0; i--) {
        const s = smokes[i];
        s.position.x += s.userData.vx * delta;
        s.position.y += s.userData.vy * delta;
        s.position.z += s.userData.vz * delta;
        s.userData.life -= s.userData.decay;

        s.scale.setScalar(1 + (1 - s.userData.life) * 3); // smoke expands
        s.material.opacity = s.userData.life * 0.3; // fade out

        if (s.userData.life <= 0) {
          scene.remove(s);
          s.geometry.dispose();
          s.material.dispose();
          smokes.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 10. Auto exit sequence trigger
    const exitTimer = setTimeout(() => {
      setIsFading(true);
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 800); // match CSS fade transition
      return () => clearTimeout(completeTimer);
    }, 4800);

    // 11. Cleanup
    return () => {
      clearTimeout(exitTimer);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      // Recursive cleanup
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((mat) => mat.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#0a0a16',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isFading ? 0 : 1,
        transition: 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
        pointerEvents: isFading ? 'none' : 'auto',
      }}
    >
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} style={{ position: 'absolute', inset: 0, zIndex: 1 }} />


    </div>
  );
};

export default RocketPreloader;
