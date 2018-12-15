
class Enemy {
	
	constructor( data ){
		this.body = data.body;
		this.body.name = "body";
		this.animationClips = data.animationClips;
	}
}

class Creeper extends Enemy {
	
	constructor( data ){
		
		super( data ); // call Entity constructor
		
		// Stats
		this.walkingSpeed = data.walkingSpeed;
		
		// Animation
		this.mixer = new THREE.AnimationMixer( this.body );
		this.animations = {
			walk_slow: this.mixer.clipAction( this.animationClips[1] ),
			idle_stance: this.mixer.clipAction( this.animationClips[0] ),
		};
		this.animations.walk_slow.timeScale = 0.5;
		
		// this.animations.idle_stance.play();
		this.animations.walk_slow.play();
		
		// Adding
		this.body.scale.multiplyScalar( data.scale );
		this.body.rotation.copy( data.rotation );
		this.body.position.copy( data.position );
		
		Levels[currentLevel].scene.add( this.body );
		
		// Skeleton Helper
		/* this.body.SkeletonHelper = new THREE.SkeletonHelper( this.body );
		this.body.SkeletonHelper.material.linewidth = 3;
		Levels[currentLevel].scene.add( this.body.SkeletonHelper ); */
		
		/* this.eyeBoxHelper = new THREE.BoxHelper( this.body , 0xff0000 );
		Levels[currentLevel].scene.add( this.eyeBoxHelper ); */
		
		
		Monsters.array.push( this );
		// console.log( this );
	}
	
	update( time ){
		
		if( time * 60 > 2.0 ) time = 1.0/60;
		
		this.mixer.update( time );
		this.updateMovement( time )
		
		// this.eyeBoxHelper.update();
		
		// this.body.position.z += 0.1/60;
		
	}
	
	updateMovement( time ){
		
		this.body.translateZ( this.walkingSpeed * time );
	}
}

