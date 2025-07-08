import * as THREE from 'three';

export class ThreeScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private icosahedron: THREE.Mesh;
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
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(this.renderer.domElement);

    // Create main wireframe icosahedron with enhanced visual effects
    const geometry = new THREE.IcosahedronGeometry(4.8, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff6a00, // Updated to match brand color scheme
      wireframe: true,
      transparent: true,
      opacity: 0.9
    });
    
    this.icosahedron = new THREE.Mesh(geometry, material);
    this.scene.add(this.icosahedron);

    // Add subtle glow effect with additional wireframe layer
    const glowGeometry = new THREE.IcosahedronGeometry(4.9, 1);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6a00,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    this.scene.add(glowMesh);

    // Add connecting lines for enterprise visual integration
    const connectionGeometry = new THREE.BufferGeometry();
    const connectionPositions = new Float32Array([
      -8, -2, 0,   // left connection point
      -3, 0, 0,    // to globe
      8, 2, 0,     // right connection point
      3, 0, 0,     // to globe
      0, -6, 0,    // bottom connection
      0, -2, 0,    // to globe
    ]);
    
    connectionGeometry.setAttribute('position', new THREE.BufferAttribute(connectionPositions, 3));
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0xff6a00,
      transparent: true,
      opacity: 0.1
    });
    
    const connectionLines = new THREE.LineSegments(connectionGeometry, connectionMaterial);
    this.scene.add(connectionLines);

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    this.scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xff8c00, 1.2);
    pointLight1.position.set(8, 8, 8);
    pointLight1.name = 'pointLight1';
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff4500, 0.8);
    pointLight2.position.set(-8, -8, 8);
    pointLight2.name = 'pointLight2';
    this.scene.add(pointLight2);

    this.camera.position.z = 9;

    // Start animation
    this.animate();

    // Handle resize
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize);
  }

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);
    
    if (this.icosahedron) {
      // Slower, more elegant rotation
      this.icosahedron.rotation.x += 0.005;
      this.icosahedron.rotation.y += 0.008;
      
      // Add gentle pulsing effect
      const time = Date.now() * 0.001;
      this.icosahedron.scale.setScalar(1 + Math.sin(time * 0.5) * 0.05);
      
      // Enhanced lighting effects
      const pointLight1 = this.scene.getObjectByName('pointLight1') as THREE.PointLight;
      const pointLight2 = this.scene.getObjectByName('pointLight2') as THREE.PointLight;
      
      if (pointLight1) {
        pointLight1.intensity = 0.6 + Math.sin(time * 0.3) * 0.1;
      }
      if (pointLight2) {
        pointLight2.intensity = 0.8 + Math.sin(time * 0.4) * 0.1;
      }
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
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
