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

    // Create main wireframe icosahedron with much darker, subtler styling
    const geometry = new THREE.IcosahedronGeometry(3.2 * this.baseScale, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x0a0a0a,
      wireframe: true,
      transparent: true,
      opacity: 0.35
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
    
    // Scale model based on hierarchy strength
    // Strong hierarchy (ratio > 4) = larger model to match title impact
    // Moderate hierarchy (ratio 2-4) = balanced model size
    // Weak hierarchy (ratio < 2) = smaller, more subtle model
    let scaleMultiplier: number;
    
    if (hierarchyRatio > 4.5) {
      // Very strong hierarchy - model supports title dominance
      scaleMultiplier = 1.2 + (hierarchyRatio - 4.5) * 0.15;
    } else if (hierarchyRatio > 3) {
      // Strong hierarchy - model complements title
      scaleMultiplier = 1.0 + (hierarchyRatio - 3) * 0.13;
    } else if (hierarchyRatio > 2) {
      // Moderate hierarchy - balanced approach
      scaleMultiplier = 0.85 + (hierarchyRatio - 2) * 0.15;
    } else {
      // Weak hierarchy - subtle, supportive model
      scaleMultiplier = 0.7 + hierarchyRatio * 0.075;
    }
    
    // Apply responsive adjustments based on container size
    const containerArea = this.renderer.domElement.parentElement?.clientWidth || 400;
    const responsiveMultiplier = Math.max(0.7, Math.min(1.2, containerArea / 400));
    
    // Final scale calculation with bounds
    this.baseScale = Math.max(0.6, Math.min(1.5, scaleMultiplier * responsiveMultiplier));
  }

  public updateScale(titleSize: number, subtitleSize: number) {
    this.calculateDynamicScale({ titleSize, subtitleSize });
    
    if (this.icosahedron) {
      // Smooth transition to new scale
      const targetScale = 3.2 * this.baseScale;
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
