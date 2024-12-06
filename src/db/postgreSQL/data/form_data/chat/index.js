export const chat = {
  sidebar: {
    contactList: {
      icons: {
        accept: "/images/form/accept_contact.png",
        decline: "/images/form/xmark.png",
        block: "/images/form/block_contact.png",
        delete: "/images/form/delete_contact.png",
        unblock: "/images/form/unblock_contact.png",
      },
    },
    header: {
      logout: {
        icon: "/images/form/logout.png",
        iconHover: "/images/form/logout_error.png",
      },
      status: {
        opened: {
          icon: "/images/form/angle_left.png",
        },
        closed: {
          icon: "/images/form/angle_right.png",
        },
      },
      settings: {
        icon: "/images/form/settings.png",
      },
    },
    user: {
      edit: {
        redirect: "upload_profile_picture",
        icon: "/images/form/edit.png",
      },
      settings: {
        icon: "/images/form/settings.png",
      },
    },
    searchContact: {
      input: {
        id: 1,
        order: 1,
        frontendSlug: "searchContact",
        placeholder: "Search contact by username...",
        name: "searchContact",
        type: "search",
        initialValue: "",
        validation: "^[a-zA-Z0-9_]{3,15}$",
        validationMessage:
          "Username must be between 3 and 15 characters and can only contain letters, numbers, and underscores.",
        searchIcon: "/images/form/search.png",
        closeIcon: "/images/form/close.png",
      },
    },
    addContact: {
      input: {
        id: 1,
        order: 1,
        frontendSlug: "addContact",
        placeholder: "Add contact by username...",
        name: "addContact",
        type: "text",
        initialValue: "",
        validation: "^[a-zA-Z0-9_]{3,15}$",
        validationMessage:
          "Username must be between 3 and 15 characters and can only contain letters, numbers, and underscores.",
        fieldIcons: {
          valid: "/images/form/add_user.png",
          error: "/images/form/add_user_error.png",
        },
      },
      button: {
        icons: {
          valid: "/images/form/add.png",
          error: "/images/form/add_error.png",
        },
        title: "Add",
        responseIcons: {
          success: "/images/form/checkmark.png",
          error: "/images/form/xmark.png",
        },
      },
    },
    inputFilters: [
      {
        id: 1,
        frontendSlug: "addContact",
        icon: "/images/form/plus_icon.png",
        iconHover: "/images/form/plus_icon_hover.png",
        iconActive: "/images/form/plus_icon_hover.png",
      },
      {
        id: 2,
        frontendSlug: "searchContact",
        icon: "/images/form/search.png",
        iconHover: "/images/form/search_hover.png",
        iconActive: "/images/form/search_hover.png",
      },
    ],
    dropdownIcons: {
      active: "/images/form/caret_down.png",
      inactive: "/images/form/caret_up.png",
    },
    contactFilters: [
      {
        id: 1,
        frontendSlug: "all",
        title: "All",
        icon: "/images/form/address_book.png",
        iconHover: "/images/form/address_book_hover.png",
        iconActive: "/images/form/address_book_hover.png",
      },
      {
        id: 2,
        frontendSlug: "pending",
        title: "Pending",
        icon: "/images/form/clock.png",
        iconHover: "/images/form/clock_hover.png",
        iconActive: "/images/form/clock_hover.png",
      },
      {
        id: 3,
        frontendSlug: "blocked",
        title: "Blocked",
        icon: "/images/form/ban.png",
        iconHover: "/images/form/ban_hover.png",
        iconActive: "/images/form/ban_hover.png",
      },
      {
        id: 4,
        frontendSlug: "accepted",
        title: "Accepted",
        icon: "/images/form/check.png",
        iconHover: "/images/form/check_hover.png",
        iconActive: "/images/form/check_hover.png",
      },
    ],
  },
  messages: {
    emptyContactListContent: "Add a contact to your list to view the messages tab.",
    inactiveConversationContent: "Please select a contact to view the messages tab.",
    input: {
      id: 1,
      order: 1,
      frontendSlug: "message",
      label: "Message",
      placeholder: "Enter your message...",
      name: "message",
      type: "text",
      inputType: "textInput",
      initialValue: "",
      validation: "",
      validationMessage: "Message cannot be empty.",
      fieldIcon: "/images/form/message_icon.png",
      actionIcon: "/images/form/send_message_icon.png",
      emoticonIcon: "/images/form/emoticon_icon.png",
      editIcon: "/images/form/blue_checkmark.png"
    },
    icons: {
      delete: "/images/form/delete_message_icon.png",
      edit: "/images/form/edit_message_icon.png",
      close_edit: "/images/form/close_edit_message_icon.png",
      sent: "/images/form/grey_checkmark.png",
      delivered:"/images/form/green_double_checkmark.png",
      scroll_down: "/images/form/scroll_down_icon.png"
    }
  },
  notifications: {
    icons: {
      success: "/images/form/close_icon_success.png",
      error: "/images/form/close_icon_error.png",
    },
  },
  settings: {
    title: "Settings",
    actions: [
      {
        id: 1,
        frontendSlug: "changeEmail",
        title: "Change Email",
        icon: "/images/form/email.png",
        iconHover: "/images/form/email_hover.png",
        description: "Update the email address associated with your account.",
        redirect: "change_email",
      },
      {
        id: 2,
        frontendSlug: "changeUsername",
        title: "Change Username",
        icon: "/images/form/username.png",
        iconHover: "/images/form/user_hover.png",
        description:
          "Modify your username. This is the name displayed to other users.",
        redirect: "change_username",
      },
      {
        id: 3,
        frontendSlug: "changePassword",
        title: "Change Password",
        icon: "/images/form/password.png",
        iconHover: "/images/form/lock_hover.png",
        description:
          "Reset or update your password to keep your account secure.",
        redirect: "change_password",
      },
      {
        id: 4,
        frontendSlug: "deleteAccount",
        title: "Delete Account",
        icon: "/images/form/trash.png",
        iconHover: "/images/form/trash_hover.png",
        description:
          "Permanently delete your account and all associated data. This action cannot be undone.",
        redirect: "delete_account",
      },
    ],
    closeIcon: "/images/form/close.png",
    backButton: {
      title: "back",
      icon: "/images/form/arrow_back.png",
    },
  },
  emojis: {
    title: "Emojis",
    frontendSlug: "emojis",
    filterIcons: {
      left: "/images/form/angle_left.png",
      right: "/images/form/angle_right.png"
    },
    content: [
      {
        id: 1,
        title: "Faces",
        frontendSlug: "faces",
        content: [
          { frontendSlug: "smiling_face_with_smiling_eyes", unicode: "U+1F60A" },
          { frontendSlug: "beaming_face_with_smiling_eyes", unicode: "U+1F601" },
          { frontendSlug: "face_with_tears_of_joy", unicode: "U+1F602" },
          { frontendSlug: "heart_eyes", unicode: "U+1F60D" },
          { frontendSlug: "face_savoring_food", unicode: "U+1F60B" },
          { frontendSlug: "grinning_face_with_big_eyes", unicode: "U+1F603" },
          { frontendSlug: "grinning_face_with_smiling_eyes", unicode: "U+1F604" },
          { frontendSlug: "crying_face", unicode: "U+1F622" },
          { frontendSlug: "disappointed_face", unicode: "U+1F61E" },
          { frontendSlug: "pensive_face", unicode: "U+1F614" },
          { frontendSlug: "worried_face", unicode: "U+1F61F" },
          { frontendSlug: "sparkling_heart", unicode: "U+1F496" },
          { frontendSlug: "red_heart", unicode: "U+2764" }, // Normal red heart
          { frontendSlug: "love_letter", unicode: "U+1F48C" },
          { frontendSlug: "face_blowing_a_kiss", unicode: "U+1F618" },
          { frontendSlug: "smiling_face_with_hearts", unicode: "U+1F970" },
          { frontendSlug: "smiling_face_with_sunglasses", unicode: "U+1F60E" },
          { frontendSlug: "face_with_stuck_out_tongue_and_winking_eye", unicode: "U+1F61C" },
          { frontendSlug: "face_with_stuck_out_tongue_and_tightly_closed_eyes", unicode: "U+1F61D" },
          { frontendSlug: "smiling_face_with_halo", unicode: "U+1F607" },
          { frontendSlug: "thinking_face", unicode: "U+1F914" },
          { frontendSlug: "grimacing_face", unicode: "U+1F62C" },
          { frontendSlug: "face_screaming_in_fear", unicode: "U+1F631" },
          { frontendSlug: "fearful_face", unicode: "U+1F628" },
          { frontendSlug: "face_with_steam_from_nose", unicode: "U+1F624" },
          { frontendSlug: "pouting_face", unicode: "U+1F621" },
          { frontendSlug: "winking_face", unicode: "U+1F609" },
          { frontendSlug: "neutral_face", unicode: "U+1F610" },
          { frontendSlug: "relieved_face", unicode: "U+1F60C" },
          { frontendSlug: "shushing_face", unicode: "U+1F92B" }
        ],
      },
      {
        id: 2,
        title: "Animals",
        frontendSlug: "animals",
        content: [
          { frontendSlug: "dog_face", unicode: "U+1F436" },
          { frontendSlug: "cat_face_with_smiling_eyes", unicode: "U+1F63A" },
          { frontendSlug: "cat_face", unicode: "U+1F431" },
          { frontendSlug: "unicorn_face", unicode: "U+1F984" },
          { frontendSlug: "monkey_face", unicode: "U+1F435" },
          { frontendSlug: "lion_face", unicode: "U+1F981" },
          { frontendSlug: "tiger_face", unicode: "U+1F42F" },
          { frontendSlug: "bear_face", unicode: "U+1F43B" },
          { frontendSlug: "fox_face", unicode: "U+1F98A" },
          { frontendSlug: "cow_face", unicode: "U+1F42E" },
          { frontendSlug: "panda_face", unicode: "U+1F43C" },
          { frontendSlug: "rabbit_face", unicode: "U+1F430" },
          { frontendSlug: "mouse_face", unicode: "U+1F42D" },
          { frontendSlug: "frog_face", unicode: "U+1F438" },
          { frontendSlug: "koala", unicode: "U+1F428" },
          { frontendSlug: "penguin", unicode: "U+1F427" },
          { frontendSlug: "chick", unicode: "U+1F424" },
          { frontendSlug: "bird", unicode: "U+1F426" },
          { frontendSlug: "baby_chick", unicode: "U+1F425" },
          { frontendSlug: "horse_face", unicode: "U+1F434" },
          { frontendSlug: "pig_face", unicode: "U+1F437" },
          { frontendSlug: "monkey", unicode: "U+1F412" },
          { frontendSlug: "snake", unicode: "U+1F40D" },
          { frontendSlug: "turtle", unicode: "U+1F422" },
          { frontendSlug: "octopus", unicode: "U+1F419" },
          { frontendSlug: "whale", unicode: "U+1F433" },
          { frontendSlug: "dolphin", unicode: "U+1F42C" },
          { frontendSlug: "shark", unicode: "U+1F988" },
          { frontendSlug: "butterfly", unicode: "U+1F98B" },
          { frontendSlug: "hedgehog", unicode: "U+1F994" }
        ],
      },
      {
        id: 3,
        title: "Food",
        frontendSlug: "food",
        content: [
          { frontendSlug: "red_apple", unicode: "U+1F34E" },
          { frontendSlug: "green_apple", unicode: "U+1F34F" },
          { frontendSlug: "pear", unicode: "U+1F350" },
          { frontendSlug: "peach", unicode: "U+1F351" },
          { frontendSlug: "grapes", unicode: "U+1F347" },
          { frontendSlug: "watermelon", unicode: "U+1F349" },
          { frontendSlug: "strawberry", unicode: "U+1F353" },
          { frontendSlug: "cherries", unicode: "U+1F352" },
          { frontendSlug: "banana", unicode: "U+1F34C" },
          { frontendSlug: "pineapple", unicode: "U+1F34D" },
          { frontendSlug: "mango", unicode: "U+1F96D" },
          { frontendSlug: "lemon", unicode: "U+1F34B" },
          { frontendSlug: "avocado", unicode: "U+1F951" },
          { frontendSlug: "carrot", unicode: "U+1F955" },
          { frontendSlug: "corn", unicode: "U+1F33D" },
          { frontendSlug: "hot_pepper", unicode: "U+1F336" },
          { frontendSlug: "cucumber", unicode: "U+1F952" },
          { frontendSlug: "pizza", unicode: "U+1F355" },
          { frontendSlug: "hamburger", unicode: "U+1F354" },
          { frontendSlug: "fries", unicode: "U+1F35F" },
          { frontendSlug: "spaghetti", unicode: "U+1F35D" },
          { frontendSlug: "sushi", unicode: "U+1F363" },
          { frontendSlug: "ice_cream", unicode: "U+1F368" },
          { frontendSlug: "cake", unicode: "U+1F370" },
          { frontendSlug: "cupcake", unicode: "U+1F9C1" },
          { frontendSlug: "chocolate_bar", unicode: "U+1F36B" },
          { frontendSlug: "popcorn", unicode: "U+1F37F" },
          { frontendSlug: "honey_pot", unicode: "U+1F36F" },
          { frontendSlug: "croissant", unicode: "U+1F950" },
          { frontendSlug: "pretzel", unicode: "U+1F968" }
        ],
      },
      {
        id: 4,
        title: "Other",
        frontendSlug: "other",
        content: [
          { frontendSlug: "globe_showing_americas", unicode: "U+1F30E" },
          { frontendSlug: "globe_showing_asia_australia", unicode: "U+1F30F" },
          { frontendSlug: "globe_with_meridians", unicode: "U+1F310" },
          { frontendSlug: "world_map", unicode: "U+1F5FA" },
          { frontendSlug: "compass", unicode: "U+1F9ED" },
          { frontendSlug: "moon", unicode: "U+1F314" },
          { frontendSlug: "sun", unicode: "U+2600" },
          { frontendSlug: "star", unicode: "U+2B50" },
          { frontendSlug: "sparkles", unicode: "U+2728" },
          { frontendSlug: "comet", unicode: "U+2604" },
          { frontendSlug: "umbrella_with_rain", unicode: "U+2614" },
          { frontendSlug: "snowflake", unicode: "U+2744" },
          { frontendSlug: "fire", unicode: "U+1F525" },
          { frontendSlug: "droplet", unicode: "U+1F4A7" },
          { frontendSlug: "waving_hand", unicode: "U+1F44B" },
          { frontendSlug: "clapping_hands", unicode: "U+1F44F" },
          { frontendSlug: "thumbs_up", unicode: "U+1F44D" },
          { frontendSlug: "raised_hands", unicode: "U+1F64C" },
          { frontendSlug: "muscle", unicode: "U+1F4AA" },
          { frontendSlug: "praying_hands", unicode: "U+1F64F" },
          { frontendSlug: "magnifying_glass_tilted_left", unicode: "U+1F50D" },
          { frontendSlug: "magnifying_glass_tilted_right", unicode: "U+1F50E" },
          { frontendSlug: "light_bulb", unicode: "U+1F4A1" },
          { frontendSlug: "hourglass", unicode: "U+23F3" },
          { frontendSlug: "watch", unicode: "U+231A" },
          { frontendSlug: "satellite", unicode: "U+1F6F0" },
          { frontendSlug: "rocket", unicode: "U+1F680" },
          { frontendSlug: "paperclip", unicode: "U+1F4CE" },
          { frontendSlug: "pencil", unicode: "U+270F" },
          { frontendSlug: "paint_palette", unicode: "U+1F3A8" },
        ],
      },
      {
        id: 5,
        title: "Celebration",
        frontendSlug: "celebration",
        content: [
          { frontendSlug: "party_popper", unicode: "U+1F389" },
          { frontendSlug: "confetti_ball", unicode: "U+1F38A" },
          { frontendSlug: "balloon", unicode: "U+1F388" },
          { frontendSlug: "sparkler", unicode: "U+1F387" },
          { frontendSlug: "fireworks", unicode: "U+1F386" },
          { frontendSlug: "birthday_cake", unicode: "U+1F382" },
          { frontendSlug: "gift", unicode: "U+1F381" },
          { frontendSlug: "christmas_tree", unicode: "U+1F384" },
          { frontendSlug: "tanabata_tree", unicode: "U+1F38B" },
          { frontendSlug: "ribbon", unicode: "U+1F380" },
          { frontendSlug: "graduation_cap", unicode: "U+1F393" },
          { frontendSlug: "trophy", unicode: "U+1F3C6" },
          { frontendSlug: "medal", unicode: "U+1F3C5" },
          { frontendSlug: "sports_medal", unicode: "U+1F3C5" },
          { frontendSlug: "checkered_flag", unicode: "U+1F3C1" },
          { frontendSlug: "clinking_glasses", unicode: "U+1F942" },
          { frontendSlug: "bottle_with_popping_cork", unicode: "U+1F37E" },
          { frontendSlug: "champagne_glass", unicode: "U+1F942" },
          { frontendSlug: "jack_o_lantern", unicode: "U+1F383" },
          { frontendSlug: "sparkling_star", unicode: "U+2728" },
          { frontendSlug: "bell", unicode: "U+1F514" },
          { frontendSlug: "drum", unicode: "U+1F941" },
          { frontendSlug: "party_hat", unicode: "U+1F973" },
          { frontendSlug: "popcorn", unicode: "U+1F37F" },
          { frontendSlug: "ticket", unicode: "U+1F39F" },
          { frontendSlug: "megaphone", unicode: "U+1F4E3" },
          { frontendSlug: "microphone", unicode: "U+1F3A4" },
          { frontendSlug: "musical_note", unicode: "U+1F3B5" },
          { frontendSlug: "trumpet", unicode: "U+1F3BA" },
          { frontendSlug: "clapper_board", unicode: "U+1F3AC" },
        ],
      },
      {
        id: 6,
        title: "Nature",
        frontendSlug: "nature",
        content: [
          { frontendSlug: "sunrise", unicode: "U+1F305" },
          { frontendSlug: "sunrise_over_mountains", unicode: "U+1F304" },
          { frontendSlug: "desert", unicode: "U+1F3DC" },
          { frontendSlug: "volcano", unicode: "U+1F30B" },
          { frontendSlug: "mountain", unicode: "U+26F0" },
          { frontendSlug: "mountain_snow", unicode: "U+1F3D4" },
          { frontendSlug: "beach_with_umbrella", unicode: "U+1F3D6" },
          { frontendSlug: "desert_island", unicode: "U+1F3DD" },
          { frontendSlug: "camping", unicode: "U+1F3D5" },
          { frontendSlug: "tent", unicode: "U+26FA" },
          { frontendSlug: "tree", unicode: "U+1F333" },
          { frontendSlug: "evergreen_tree", unicode: "U+1F332" },
          { frontendSlug: "palm_tree", unicode: "U+1F334" },
          { frontendSlug: "cactus", unicode: "U+1F335" },
          { frontendSlug: "fallen_leaf", unicode: "U+1F342" },
          { frontendSlug: "maple_leaf", unicode: "U+1F341" },
          { frontendSlug: "four_leaf_clover", unicode: "U+1F340" },
          { frontendSlug: "tulip", unicode: "U+1F337" },
          { frontendSlug: "rose", unicode: "U+1F339" },
          { frontendSlug: "hibiscus", unicode: "U+1F33A" },
          { frontendSlug: "sunflower", unicode: "U+1F33B" },
          { frontendSlug: "blossom", unicode: "U+1F33C" },
          { frontendSlug: "mushroom", unicode: "U+1F344" },
          { frontendSlug: "shell", unicode: "U+1F41A" },
          { frontendSlug: "cloud", unicode: "U+2601" },
          { frontendSlug: "rainbow", unicode: "U+1F308" },
          { frontendSlug: "lightning", unicode: "U+26A1" },
          { frontendSlug: "wind_face", unicode: "U+1F32C" },
          { frontendSlug: "droplet", unicode: "U+1F4A7" },
          { frontendSlug: "crescent_moon", unicode: "U+1F319" }
        ],
      },
      
    ],
  },
  contact: {
    icons: {
      accept: "/images/form/accept_contact.png",
      decline: "/images/form/xmark.png",
      block: "/images/form/block_contact.png",
      delete: "/images/form/delete_contact.png",
      unblock: "/images/form/unblock_contact.png",
    },
  },
};
