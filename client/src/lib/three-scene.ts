import * as THREE from 'three';

export class ThreeScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private icosahedron: THREE.Mesh;
  private outerRing: THREE.Mesh;
  private innerSphere: THREE.Mesh;
  private particles: THREE.Points;
  private animationId: number | null = null;

  constructor(container: HTMLElement) {
    // Scene setup
    this.scene = new THREE.Scene();
    
    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    
    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setClearColor(0x000000, 0);
    container.appendChild(this.renderer.domElement);

    // Create main wireframe icosahedron (larger)
    const geometry = new THREE.IcosahedronGeometry(3.5, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff8c00,
      wireframe: true,
      transparent: true,
      opacity: 0.9
    });
    
    this.icosahedron = new THREE.Mesh(geometry, material);
    this.scene.add(this.icosahedron);

    // Create outer rotating ring
    const ringGeometry = new THREE.TorusGeometry(5, 0.05, 8, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xff8c00,
      transparent: true,
      opacity: 0.6
    });
    this.outerRing = new THREE.Mesh(ringGeometry, ringMaterial);
    this.outerRing.rotation.x = Math.PI / 4;
    this.scene.add(this.outerRing);

    // Create inner glowing sphere
    const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 16);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xff8c00,
      transparent: true,
      opacity: 0.3,
      wireframe: false
    });
    this.innerSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    this.scene.add(this.innerSphere);

    // Create floating particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xff8c00,
      size: 0.1,
      transparent: true,
      opacity: 0.7
    });
    
    this.particles = new THREE.Points(particleGeometry, particleMaterial);
    this.scene.add(this.particles);

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    this.scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xff8c00, 1.2);
    pointLight1.position.set(8, 8, 8);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff4500, 0.8);
    pointLight2.position.set(-8, -8, 8);
    this.scene.add(pointLight2);

    this.camera.position.z = 8;

    // Start animation
    this.animate();

    // Handle resize
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize);
  }

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);
    
    const time = Date.now() * 0.001;
    
    if (this.icosahedron) {
      this.icosahedron.rotation.x += 0.008;
      this.icosahedron.rotation.y += 0.012;
    }

    if (this.outerRing) {
      this.outerRing.rotation.z += 0.015;
      this.outerRing.rotation.y += 0.005;
    }

    if (this.innerSphere) {
      this.innerSphere.rotation.x += 0.01;
      this.innerSphere.rotation.z += 0.008;
      // Pulsing effect
      const scale = 1 + Math.sin(time * 2) * 0.1;
      this.innerSphere.scale.set(scale, scale, scale);
    }

    if (this.particles) {
      this.particles.rotation.x += 0.001;
      this.particles.rotation.y += 0.002;
    }
    
    this.renderer.render(this.scene, this.camera);
  };

  private handleResize() {
    const container = this.renderer.domElement.parentElement;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  public dispose() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    window.removeEventListener('resize', this.handleResize);
    
    if (this.renderer.domElement.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
    }
    
    this.renderer.dispose();
  }
}
