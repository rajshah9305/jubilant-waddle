import * as THREE from 'three';

export class ThreeScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private icosahedron: THREE.Mesh;
  private animationId: number | null = null;
  private baseScale: number = 1;

  constructor(container: HTMLElement, options?: { titleSize?: number; subtitleSize?: number }) {
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

    // Calculate dynamic scale based on typography hierarchy
    this.calculateDynamicScale(options);

    // Create main wireframe icosahedron with enhanced scaling for better visual hierarchy
    const geometry = new THREE.IcosahedronGeometry(2.8 * this.baseScale, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x2a2a2a,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    
    this.icosahedron = new THREE.Mesh(geometry, material);
    this.scene.add(this.icosahedron);

    // Enhanced lighting for better depth and hierarchy
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x666666, 0.4);
    directionalLight.position.set(10, 10, 10);
    this.scene.add(directionalLight);

    // Accent lighting for visual prominence
    const pointLight1 = new THREE.PointLight(0x4a4a4a, 0.3);
    pointLight1.position.set(8, 8, 8);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x333333, 0.25);
    pointLight2.position.set(-8, -8, 8);
    this.scene.add(pointLight2);

    // Optimal camera position to show complete model with proper hierarchy
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

  private calculateDynamicScale(options?: { titleSize?: number; subtitleSize?: number }) {
    // Default sizes based on current typography (in rem/px equivalent)
    const defaultTitleSize = 96; // 6xl-8xl range
    const defaultSubtitleSize = 20; // xl range
    
    const titleSize = options?.titleSize || defaultTitleSize;
    const subtitleSize = options?.subtitleSize || defaultSubtitleSize;
    
    // Calculate hierarchy ratio (title prominence relative to subtitle)
    const hierarchyRatio = titleSize / subtitleSize;
    
    // Enhanced scale model based on hierarchy strength for better visual prominence
    let scaleMultiplier: number;
    
    if (hierarchyRatio > 4.5) {
      // Very strong hierarchy - prominent model to match title impact
      scaleMultiplier = 1.6 + (hierarchyRatio - 4.5) * 0.2;
    } else if (hierarchyRatio > 3) {
      // Strong hierarchy - noticeable model complements title
      scaleMultiplier = 1.3 + (hierarchyRatio - 3) * 0.2;
    } else if (hierarchyRatio > 2) {
      // Moderate hierarchy - balanced but prominent approach
      scaleMultiplier = 1.1 + (hierarchyRatio - 2) * 0.2;
    } else {
      // Weak hierarchy - still visible but supportive model
      scaleMultiplier = 0.9 + hierarchyRatio * 0.1;
    }
    
    // Apply responsive adjustments based on container size
    const containerArea = this.renderer.domElement.parentElement?.clientWidth || 400;
    const responsiveMultiplier = Math.max(0.8, Math.min(1.4, containerArea / 400));
    
    // Final scale calculation with enhanced bounds for better visibility
    this.baseScale = Math.max(0.8, Math.min(2.2, scaleMultiplier * responsiveMultiplier));
  }

  public updateScale(titleSize: number, subtitleSize: number) {
    this.calculateDynamicScale({ titleSize, subtitleSize });
    
    if (this.icosahedron) {
      // Smooth transition to new scale with better proportions
      const targetScale = 2.8 * this.baseScale;
      this.icosahedron.scale.setScalar(targetScale);
    }
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
