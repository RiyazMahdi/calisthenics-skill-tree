export const skillsData = [
  // ─── PUSH ──────────────────────────────────────────────────────────────────

  // Beginner chain
  {
    id: "wall_push_up",
    category: "Push",
    name: "Wall Push-up",
    description:
      "Push-ups performed against a wall. The gentlest entry point for building pushing strength.",
    prerequisites: [],
  },
  {
    id: "incline_push_up",
    category: "Push",
    name: "Incline Push-up",
    description:
      "Hands on an elevated surface, reducing the load compared to a full push-up.",
    prerequisites: ["wall_push_up"],
  },
  {
    id: "knee_push_up",
    category: "Push",
    name: "Knee Push-up",
    description:
      "Push-ups from the knees, closer to full bodyweight loading than incline variations.",
    prerequisites: ["incline_push_up"],
  },
  {
    id: "push_up",
    category: "Push",
    name: "Push-up",
    description:
      "The standard push-up performed from the toes through a full range of motion.",
    prerequisites: ["knee_push_up"],
  },

  // Tricep and one-arm branch
  {
    id: "diamond_push_up",
    category: "Push",
    name: "Diamond Push-up",
    description:
      "Hands placed close together beneath the chest, shifting load onto the triceps.",
    prerequisites: ["push_up"],
  },
  {
    id: "archer_push_up",
    category: "Push",
    name: "Archer Push-up",
    description:
      "One arm takes most of the load while the other extends to the side, building unilateral strength.",
    prerequisites: ["diamond_push_up"],
  },
  {
    id: "one_arm_push_up",
    category: "Push",
    name: "One-Arm Push-up",
    description:
      "A full push-up using only one arm, requiring exceptional unilateral chest and tricep strength.",
    prerequisites: ["archer_push_up"],
    milestone: true
  },

  // Explosive push branch
  {
    id: "explosive_push_up",
    category: "Push",
    name: "Explosive Push-up",
    description:
      "A push-up performed with enough force to briefly leave the ground, building upper body power.",
    prerequisites: ["push_up"],
  },
  {
    id: "clapping_push_up",
    category: "Push",
    name: "Clapping Push-up",
    description:
      "An explosive push-up with a clap at the top, demanding significant fast-twitch strength.",
    prerequisites: ["explosive_push_up"],
  },

  // Dips branch
  {
    id: "dips",
    category: "Push",
    name: "Dips",
    description:
      "A pressing movement on parallel bars targeting the chest and triceps through a deep range of motion.",
    prerequisites: ["push_up"],
  },
  {
    id: "ring_dips",
    category: "Push",
    name: "Ring Dips",
    description:
      "Dips performed on gymnastic rings, adding instability that significantly increases the demand on stabilising muscles. Requires rings.",
    prerequisites: ["dips"],
    equipment: "rings",
  },

  {
    id: "frog_stand",
    category: "Push",
    name: "Frog Stand",
    description:
      "Balancing in a deep squat with hands flat on the ground and knees resting on the back of the upper arms. The gateway to all arm balance work in calisthenics.",
    prerequisites: ["push_up", "hollow_hold"],
  },

  {
    id: "crow_pose",
    category: "Push",
    name: "Crow Pose",
    description:
      "An arm balance with bent elbows supporting both knees, requiring wrist strength, core tension, and the confidence to lean weight forward onto the hands.",
    prerequisites: ["frog_stand"],
  },

  {
    id: "crane_pose",
    category: "Push",
    name: "Crane Pose",
    description:
      "A crow pose performed on straight arms, significantly increasing the demand on wrist and shoulder strength.",
    prerequisites: ["crow_pose"],
  },

  {
    id: "elbow_lever",
    category: "Push",
    name: "Elbow Lever",
    description:
      "A horizontal hold balanced on a single elbow placed against the hip, requiring core tension, back engagement, and precise balance control.",
    prerequisites: ["frog_stand", "planche_lean"],
  },

  { id: "ring_push_up", category: "Push", name: "Ring Push-up",
  description: "Push-ups performed on gymnastic rings, adding instability that significantly increases the demand on the chest and shoulder stabilisers. Requires rings.",
  prerequisites: ["push_up"], equipment: "rings" },

  { id: "pseudo_planche_push_up", category: "Push", name: "Pseudo Planche Push-up",
    description: "Push-ups with hands rotated outward and the body leaning forward to simulate the planche loading pattern, building the wrist and anterior shoulder strength required for planche progressions.",
    prerequisites: ["planche_lean"] },
    // Handstand branch
  {
    id: "pike_push_up",
    category: "Push",
    name: "Pike Push-up",
    description:
      "Hips raised high so shoulders bear more of the load, preparing the body for overhead pressing.",
    prerequisites: ["push_up"],
  },
  {
    id: "elevated_pike_push_up",
    category: "Push",
    name: "Elevated Pike Push-up",
    description:
      "Feet raised on a surface, increasing the angle and loading the shoulders closer to a handstand.",
    prerequisites: ["pike_push_up"],
  },
  {
    id: "wall_handstand",
    category: "Push",
    name: "Wall Handstand",
    description:
      "An isometric hold upside down with feet against the wall, building the balance and shoulder endurance needed for handstand work.",
    prerequisites: ["elevated_pike_push_up"],
  },
  {
    id: "tripod_headstand",
    category: "Push",
    name: "Tripod Headstand",
    description:
      "Balancing inverted on the head and two hands in a triangular base, the safest entry point to headstand training and overhead body awareness.",
    prerequisites: ["elevated_pike_push_up"],
  },

  {
    id: "headstand",
    category: "Push",
    name: "Headstand",
    description:
      "A full inverted balance on the head, building the body awareness and confidence needed for advanced handstand work.",
    prerequisites: ["tripod_headstand"],
  },
  {
    id: "handstand",
    category: "Push",
    name: "Freestanding Handstand",
    description:
      "A full freestanding handstand held away from the wall, requiring balance, wrist control, and shoulder stability. One of the signature calisthenics skills.",
    prerequisites: ["wall_handstand"],
    milestone: true,
  },
  {
    id: "wall_handstand_push_up",
    category: "Push",
    name: "Wall Handstand Push-up",
    description:
      "A pressing movement performed upside down with feet on the wall for balance support.",
    prerequisites: ["wall_handstand"],
  },
  {
    id: "handstand_push_up",
    category: "Push",
    name: "Freestanding Handstand Push-up",
    description:
      "A full handstand push-up with no wall support, combining balance and maximal overhead pressing strength.",
    prerequisites: ["wall_handstand_push_up", "handstand"],
  },

  // Planche branch (cross-category, requires Core)
  {
    id: "planche_lean",
    category: "Push",
    name: "Planche Lean",
    description:
      "A push-up position with hands placed further back and body leaning forward, loading the shoulders and wrists in the planche pattern.",
    prerequisites: ["push_up", "hollow_hold"],
  },
  {
    id: "tuck_planche",
    category: "Push",
    name: "Tuck Planche",
    description:
      "A horizontal hold with knees tucked toward the chest and body fully off the ground, requiring significant pushing and core strength.",
    prerequisites: ["planche_lean", "tuck_l_sit"],
  },
  {
    id: "advanced_tuck_planche",
    category: "Push",
    name: "Advanced Tuck Planche",
    description:
      "The tuck position with the knees extended slightly further, increasing the lever arm and difficulty.",
    prerequisites: ["tuck_planche"],
  },
  {
    id: "straddle_planche",
    category: "Push",
    name: "Straddle Planche",
    description:
      "Legs extended and spread wide in a horizontal hold, a major step toward the full planche.",
    prerequisites: ["advanced_tuck_planche"],
  },
  {
    id: "full_planche",
    category: "Push",
    name: "Full Planche",
    description:
      "A full horizontal hold with legs straight and together, one of the most demanding skills in calisthenics.",
    prerequisites: ["straddle_planche"],
    milestone: true
  },

  // ─── PULL ──────────────────────────────────────────────────────────────────

  // Beginner chain
  {
    id: "dead_hang",
    category: "Pull",
    name: "Dead Hang",
    description:
      "Hanging passively from a bar, building grip strength and shoulder mobility.",
    prerequisites: [],
  },
  {
    id: "scapular_pull_up",
    category: "Pull",
    name: "Scapular Pull-up",
    description:
      "A small retraction of the shoulder blades from a dead hang, teaching proper scapular engagement before pulling.",
    prerequisites: ["dead_hang"],
  },
  {
    id: "negative_pull_up",
    category: "Pull",
    name: "Negative Pull-up",
    description:
      "Slowly lowering from the top of a pull-up position, building strength throughout the full range of motion.",
    prerequisites: ["scapular_pull_up"],
  },
  {
    id: "rows",
    category: "Pull",
    name: "Inverted Rows",
    description:
      "A horizontal pulling exercise under a low bar, useful as a foundational pulling movement.",
    prerequisites: [],
  },

  // Ring rows (optional)
  {
    id: "ring_rows",
    category: "Pull",
    name: "Ring Rows",
    description:
      "Inverted rows on gymnastic rings, adding instability and range of motion compared to a fixed bar. Requires rings.",
    prerequisites: ["rows"],
    equipment: "rings",
  },

  // Main pull chain
  {
    id: "pull_up",
    category: "Pull",
    name: "Pull-up",
    description:
      "The classic vertical pulling exercise targeting the back, biceps, and grip.",
    prerequisites: ["negative_pull_up"],
  },

  // Explosive pull branch
  {
    id: "explosive_pull_up",
    category: "Pull",
    name: "Explosive Pull-up",
    description:
      "A pull-up performed with enough force to briefly release the bar at the top, building upper body pulling power.",
    prerequisites: ["pull_up"],
  },
  {
    id: "clapping_pull_up",
    category: "Pull",
    name: "Clapping Pull-up",
    description:
      "An explosive pull-up with a clap above the bar, demanding elite level pulling power.",
    prerequisites: ["explosive_pull_up"],
  },

  // One-arm branch
  {
    id: "chest_to_bar",
    category: "Pull",
    name: "Chest-to-Bar Pull-up",
    description:
      "A pull-up through a fuller range of motion, pulling until the chest touches the bar.",
    prerequisites: ["pull_up"],
  },
  {
    id: "archer_pull_up",
    category: "Pull",
    name: "Archer Pull-up",
    description:
      "One arm does most of the pulling while the other arm extends, building toward one-arm strength.",
    prerequisites: ["chest_to_bar"],
  },
  {
    id: "one_arm_pull_up",
    category: "Pull",
    name: "One-Arm Pull-up",
    description:
      "A full pull-up performed with a single arm, among the most demanding pulling skills in calisthenics.",
    prerequisites: ["archer_pull_up"],
    milestone: true
  },

  // Ring pull branch (optional)
  {
    id: "ring_pull_up",
    category: "Pull",
    name: "Ring Pull-up",
    description:
      "Pull-ups on gymnastic rings, adding instability and allowing a more natural wrist rotation. Requires rings.",
    prerequisites: ["pull_up"],
    equipment: "rings",
  },

  // Muscle-up (cross-category)
  {
    id: "muscle_up",
    category: "Pull",
    name: "Muscle-up",
    description:
      "A transition from a pull-up into a dip above the bar, combining pulling and pushing strength.",
    prerequisites: ["chest_to_bar", "dips"],
    milestone: true
  },
  {
    id: "ring_muscle_up",
    category: "Pull",
    name: "Ring Muscle-up",
    description:
      "A muscle-up performed on rings, significantly harder due to instability and the greater range of motion required. Requires rings.",
    prerequisites: ["muscle_up", "ring_pull_up"],
    equipment: "rings",
  },

  // Front lever chain (cross-category)
  {
    id: "tuck_front_lever",
    category: "Pull",
    name: "Tuck Front Lever",
    description:
      "A horizontal hold with knees tucked toward the chest, the entry point to front lever training.",
    prerequisites: ["chest_to_bar", "hollow_hold"],
  },
  {
    id: "advanced_tuck_front_lever",
    category: "Pull",
    name: "Advanced Tuck Front Lever",
    description:
      "The tuck position opened slightly, increasing the lever arm and the difficulty of the hold.",
    prerequisites: ["tuck_front_lever"],
  },
  {
    id: "straddle_front_lever",
    category: "Pull",
    name: "Straddle Front Lever",
    description:
      "Legs extended and spread apart, approaching the difficulty of the full front lever.",
    prerequisites: ["advanced_tuck_front_lever"],
  },
  {
    id: "front_lever",
    category: "Pull",
    name: "Front Lever",
    description:
      "A full horizontal hold with legs straight and together, a benchmark calisthenics pulling skill.",
    prerequisites: ["straddle_front_lever"],
    milestone: true
  },

  // Back lever chain
  {
    id: "tuck_back_lever",
    category: "Pull",
    name: "Tuck Back Lever",
    description:
      "A horizontal hold facing downward with knees tucked, the entry point to back lever training.",
    prerequisites: ["tuck_front_lever"],
  },
  {
    id: "straddle_back_lever",
    category: "Pull",
    name: "Straddle Back Lever",
    description:
      "Legs spread wide in a downward facing horizontal hold, progressing toward the full back lever.",
    prerequisites: ["tuck_back_lever"],
  },
  {
    id: "back_lever",
    category: "Pull",
    name: "Back Lever",
    description:
      "A full downward facing horizontal hold requiring exceptional shoulder flexibility and pulling strength.",
    prerequisites: ["straddle_back_lever"],
    milestone: true
  },

  { id: "typewriter_pull_up", category: "Pull", name: "Typewriter Pull-up",
  description: "At the top of a pull-up, the body travels laterally across the bar in a controlled arc, demanding significant horizontal pulling strength.",
  prerequisites: ["chest_to_bar"] },

  { id: "l_sit_pull_up", category: "Pull", name: "L-sit Pull-up",
    description: "A pull-up performed while holding the legs in the L-sit position throughout the movement, combining vertical pulling strength and core compression.",
    prerequisites: ["pull_up", "tuck_l_sit"] },

  { id: "skin_the_cat", category: "Pull", name: "Skin the Cat",
    description: "A complete shoulder rotation on the bar or rings, passing through the back lever position in both directions. Requires exceptional shoulder flexibility and control.",
    prerequisites: ["tuck_front_lever", "tuck_back_lever"] },

  // Human flag chain (cross-category)
  {
    id: "tuck_human_flag",
    category: "Pull",
    name: "Tuck Human Flag",
    description:
      "A sideways hold on a vertical pole with knees tucked, the entry point to human flag training.",
    prerequisites: ["front_lever", "dragon_flag"],
  },
  {
    id: "human_flag",
    category: "Pull",
    name: "Human Flag",
    description:
      "A full sideways hold on a vertical pole with legs straight, one of the most visually impressive skills in calisthenics.",
    prerequisites: ["tuck_human_flag"],
    milestone: true
  },

  // ─── CORE ──────────────────────────────────────────────────────────────────

  {
    id: "dead_bug",
    category: "Core",
    name: "Dead Bug",
    description:
      "Lying on your back with arms and legs extended, alternating limb lowering while keeping the lower back flat. A foundational anti-extension exercise.",
    prerequisites: [],
  },
  {
    id: "plank",
    category: "Core",
    name: "Plank",
    description:
      "A foundational isometric hold building basic core stability and body tension.",
    prerequisites: [],
  },
  {
    id: "side_plank",
    category: "Core",
    name: "Side Plank",
    description:
      "A lateral isometric hold targeting the obliques and lateral stabilisers.",
    prerequisites: ["plank"],
  },
  {
    id: "knee_raises",
    category: "Core",
    name: "Knee Raises",
    description:
      "Hanging or supported knee raises, building hip flexor and lower ab strength.",
    prerequisites: [],
  },
  {
    id: "ab_wheel_rollout",
    category: "Core",
    name: "Ab Wheel Rollout",
    description:
      "Rolling out from a kneeling position on an ab wheel, training anti-extension core strength through a long range of motion.",
    prerequisites: ["plank"],
  },
  {
    id: "hollow_hold",
    category: "Core",
    name: "Hollow Body Hold",
    description:
      "A full body tension position used throughout calisthenics to maintain a stable, flat body line.",
    prerequisites: ["plank", "knee_raises"],
  },
  {
    id: "bridge_hold",
    category: "Core",
    name: "Bridge Hold",
    description:
      "An isometric back arch hold building spinal extension strength and shoulder flexibility needed for advanced skills.",
    prerequisites: [],
  },
  {
    id: "bridge_push_up",
    category: "Core",
    name: "Bridge Push-up",
    description:
      "A dynamic pushing movement from the bridge position, building spinal strength and overhead flexibility.",
    prerequisites: ["bridge_hold"],
  },
  {
    id: "tuck_l_sit",
    category: "Core",
    name: "Tuck L-sit",
    description:
      "An L-sit with the knees bent toward the chest, the entry point to L-sit training.",
    prerequisites: ["hollow_hold"],
  },
  {
    id: "l_sit",
    category: "Core",
    name: "L-sit",
    description:
      "An isometric hold with legs extended horizontally, demanding significant hip flexor and core strength.",
    prerequisites: ["tuck_l_sit"],
    milestone: true
  },
  {
    id: "v_sit",
    category: "Core",
    name: "V-sit",
    description:
      "Legs raised above horizontal from the L-sit position, a significant increase in hip flexor and core demand.",
    prerequisites: ["l_sit"],
  },
  {
    id: "dragon_flag",
    category: "Core",
    name: "Dragon Flag",
    description:
      "A controlled lowering of the body from a shoulder-supported position, demanding full body tension and core control.",
    prerequisites: ["hollow_hold"],
  },
  {
    id: "hanging_windshield_wiper",
    category: "Core",
    name: "Hanging Windshield Wiper",
    description:
      "Hanging from a bar with legs raised, rotating them side to side in a controlled arc. Trains rotational core strength.",
    prerequisites: ["l_sit"],
  },

  { id: "seated_leg_raise", category: "Core", name: "Seated Leg Raise",
  description: "Sitting with hands flat beside you and lifting the legs straight in front. The most approachable entry point to L-sit compression training.",
  prerequisites: ["hollow_hold"] },

  { id: "hanging_knee_raises", category: "Core", name: "Hanging Knee Raises",
    description: "Hanging from a bar and drawing the knees toward the chest under control. Builds hip flexor and core strength in a hanging position.",
    prerequisites: ["hollow_hold"] },

  { id: "hanging_leg_raises", category: "Core", name: "Hanging Leg Raises",
    description: "Straight leg raises while hanging from a bar, significantly increasing core and hip flexor demand over the bent knee version.",
    prerequisites: ["hanging_knee_raises", "tuck_l_sit"] },

  { id: "toes_to_bar", category: "Core", name: "Toes to Bar",
    description: "A hanging movement bringing the feet all the way up to touch the bar, demanding exceptional core strength and hip flexor endurance.",
    prerequisites: ["hanging_leg_raises", "l_sit"] },

  { id: "hollow_body_rock", category: "Core", name: "Hollow Body Rock",
    description: "Rocking back and forth while maintaining a tight hollow body position, building the ability to maintain full body tension dynamically.",
    prerequisites: ["hollow_hold"] },

  { id: "reverse_plank", category: "Core", name: "Reverse Plank",
    description: "Facing upward with hands behind you supporting the body in a straight line, building posterior chain and shoulder stability.",
    prerequisites: ["plank"] },

  { id: "copenhagen_plank", category: "Core", name: "Copenhagen Plank",
    description: "A side plank with the top foot elevated on a surface, dramatically increasing the adductor and lateral stability demands.",
    prerequisites: ["side_plank"] },

  { id: "arch_body_hold", category: "Core", name: "Arch Body Hold",
    description: "Lying face down and lifting the arms, chest, and legs simultaneously in a Superman position, building posterior chain awareness and strength.",
    prerequisites: ["plank"] },

  { id: "back_extension", category: "Core", name: "Back Extension",
    description: "A dynamic movement from the arch body position, building controlled spinal extension strength through a full range of motion.",
    prerequisites: ["arch_body_hold"] },

  { id: "ab_wheel_standing", category: "Core", name: "Standing Ab Wheel",
    description: "The full standing version of the ab wheel rollout, with the maximum possible anti-extension demand on the core.",
    prerequisites: ["ab_wheel_rollout"] },


  // ─── LEGS ──────────────────────────────────────────────────────────────────

  // Foundation
  {
    id: "glute_bridge",
    category: "Legs",
    name: "Glute Bridge",
    description:
      "A hip extension movement lying on the back, building foundational glute strength and hip hinge awareness.",
    prerequisites: [],
  },
  {
    id: "bodyweight_squat",
    category: "Legs",
    name: "Bodyweight Squat",
    description:
      "The foundational lower body movement, building quad, glute, and hamstring strength.",
    prerequisites: [],
  },

  // Explosive branch
  {
    id: "jump_squat",
    category: "Legs",
    name: "Jump Squat",
    description:
      "A squat performed explosively enough to leave the ground, developing lower body power.",
    prerequisites: ["bodyweight_squat"],
  },
  {
    id: "box_jump",
    category: "Legs",
    name: "Box Jump",
    description:
      "Jumping onto an elevated surface, requiring explosive hip extension and precise landing mechanics.",
    prerequisites: ["jump_squat"],
  },
  {
    id: "depth_jump",
    category: "Legs",
    name: "Depth Jump",
    description:
      "Stepping off a box and immediately jumping on landing, training reactive strength and the stretch-shortening cycle.",
    prerequisites: ["box_jump"],
  },

  // Single leg strength chain
  {
    id: "lunge",
    category: "Legs",
    name: "Lunge",
    description:
      "A single leg movement building balance and unilateral leg strength.",
    prerequisites: ["bodyweight_squat"],
  },
  {
    id: "jump_lunge",
    category: "Legs",
    name: "Jump Lunge",
    description:
      "An alternating lunge jump combining single leg strength and lower body power.",
    prerequisites: ["lunge", "jump_squat"],
  },
  {
    id: "nordic_curl",
    category: "Legs",
    name: "Nordic Curl",
    description:
      "Kneeling with feet anchored, lowering the body toward the ground under hamstring control. One of the most effective hamstring exercises in bodyweight training.",
    prerequisites: ["lunge"],
  },
  {
    id: "bulgarian_split_squat",
    category: "Legs",
    name: "Bulgarian Split Squat",
    description:
      "A rear-foot elevated split squat, significantly increasing single leg loading and balance demands.",
    prerequisites: ["lunge"],
  },
  {
    id: "assisted_pistol_squat",
    category: "Legs",
    name: "Assisted Pistol Squat",
    description:
      "A single leg squat while holding something for balance support.",
    prerequisites: ["bulgarian_split_squat"],
  },
  {
    id: "pistol_squat",
    category: "Legs",
    name: "Pistol Squat",
    description:
      "A single leg squat performed unassisted through a full range of motion.",
    prerequisites: ["assisted_pistol_squat"],
    milestone: true
  },
  {
    id: "shrimp_squat",
    category: "Legs",
    name: "Shrimp Squat",
    description:
      "A single leg squat with the rear leg held behind, requiring extreme strength, balance, and mobility.",
    prerequisites: ["pistol_squat"],
  },
  {
    id: "glute_ham_raise",
    category: "Legs",
    name: "Glute Ham Raise",
    description:
      "A full posterior chain movement combining knee flexion and hip extension, one of the most demanding bodyweight hamstring exercises.",
    prerequisites: ["nordic_curl"],
  },
  { id: "wall_sit", category: "Legs", name: "Wall Sit",
  description: "An isometric hold at ninety degrees with the back against a wall, building leg endurance and preparing the knees for deeper loading.",
  prerequisites: ["bodyweight_squat"] },

  { id: "calf_raise", category: "Legs", name: "Calf Raise",
    description: "A simple bilateral calf raise building the soleus and gastrocnemius strength needed for jumping, sprinting, and single leg work.",
    prerequisites: [] },

  { id: "single_leg_calf_raise", category: "Legs", name: "Single Leg Calf Raise",
    description: "A single leg calf raise requiring significantly greater balance and unilateral calf strength than the two legged version.",
    prerequisites: ["calf_raise"] },

  { id: "step_up", category: "Legs", name: "Step Up",
    description: "Stepping onto an elevated surface under full control, building single leg strength, knee stability, and hip extension strength.",
    prerequisites: ["lunge"] },

  { id: "sissy_squat", category: "Legs", name: "Sissy Squat",
    description: "A quad-dominant squat with heels elevated and torso leaning back, isolating the quadriceps through a long range of motion.",
    prerequisites: ["bodyweight_squat"] },

  { id: "hip_thrust", category: "Legs", name: "Hip Thrust",
    description: "A glute bridge with shoulders elevated, allowing a greater range of hip extension and significantly higher glute activation.",
    prerequisites: ["glute_bridge"] },

  { id: "single_leg_squat_touchdown", category: "Legs", name: "Single Leg Squat Touchdown",
    description: "A controlled single leg squat with a reach to touch the ground, building unilateral strength, balance, and hip hinge awareness.",
    prerequisites: ["lunge"] },

  { id: "sprinter_lunge", category: "Legs", name: "Sprinter Lunge",
    description: "An explosive alternating lunge jump with a forward lean, building the hip extension power required for sprinting and athletic movement.",
    prerequisites: ["jump_lunge"] },

  { id: "natural_leg_curl", category: "Legs", name: "Natural Leg Curl",
    description: "An advanced hamstring movement combining the Nordic curl with hip extension, building full posterior chain strength through a complete range of motion.",
    prerequisites: ["nordic_curl"] },

  { id: "skater_squat", category: "Legs", name: "Skater Squat",
    description: "A single leg squat with the trailing leg extended behind rather than tucked under, a significant step beyond the pistol squat in balance and control.",
    prerequisites: ["pistol_squat"] },
];
