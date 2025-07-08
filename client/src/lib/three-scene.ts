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

    // Create main wireframe icosahedron with enhanced size for better visual impact
    const geometry = new THREE.IcosahedronGeometry(4.8, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x0a0a0a,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    
    this.icosahedron = new THREE.Mesh(geometry, material);
    this.scene.add(this.icosahedron);

    // Minimal ambient lighting for subtle depth
    const ambientLight = new THREE.AmbientLight(0x1a1a1a, 0.15);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x333333, 0.25);
    directionalLight.position.set(10, 10, 10);
    this.scene.add(directionalLight);

    // Very subtle accent lighting for minimal depth
    const pointLight1 = new THREE.PointLight(0x2a2a2a, 0.2);
    pointLight1.position.set(8, 8, 8);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x1f1f1f, 0.15);
    pointLight2.position.set(-8, -8, 8);
    this.scene.add(pointLight2);

    this.camera.position.z = 12;

    // Start animation
    this.animate();

    // Handle resize
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize);
  }

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);
    
    if (this.icosahedron) {
      this.icosahedron.rotation.x += 0.004;
      this.icosahedron.rotation.y += 0.006;
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
