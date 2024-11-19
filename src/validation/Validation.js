import * as yup from "yup";
import {
  parsePhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";

const amountRegex = /[1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]/;
const emailRegex =
  /^[_a-za-zA-Z0-9-]+(\.[_a-za-zA-Z0-9-]+)*@[a-za-zA-Z0-9-]+(\.[a-za-zA-Z0-9-]+)*(\.[a-za-zA-Z]{2,64})$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,20}$/;

const validFileExtensions = {
  image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
};

export function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType]?.indexOf(fileName?.split(".").pop()) > -1
  );
}

//Login Validation schema
export const validationSchemaLogin = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter the valid email")
    .matches(emailRegex, "Enter the valid email"),
  password: yup.string().required("Password is required"),

  // pattern: {
  //   value:
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,}$/,
  //   message: "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.",
  // },
});

//forgot password
export const validationSchemaForgotpassword = yup.object().shape({
  email: yup
    .string()
    .email("Enter the valid email")
    .matches(emailRegex, "Enter the valid email")

    .required("Email is required"),
});

// reset password
export const validationSchemaResetPassword = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, "Password is too short - should be 8 Characters minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,20}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Characters"
    )
    .required("Password is a required "),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

// change password
export const validationSchemaChangepassword = yup.object().shape({
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup
    .string()
    .min(8, "Password is too short - should be 8 Characters minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,20}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Characters"
    )
    .required("Password is a required "),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("newPassword"), null], "Password must match"),
});

export const validationSchemaYearOfSahay = yup.object().shape({
  fromYear: yup.string().required("This field is requried"),
  toYear: yup.string().required("This field is requried"),
});

//Login Validation schema
export const validationSchemaUserLogin = yup.object().shape({
  number: yup
    .string()
    .required("Mobile number is required")
    .min(10, "Mobile Number should be 10 digits"),
});

// Setting Validation
export const validationSchemaUserSetting = yup.object().shape({
  withdrawalAmount: yup
    .string()
    .required("Withdrawal Amount Limit is required"),

  minimumBalance: yup
    .string()
    .required("Minimum  Balance In Wallet is required"),

  rewardsPoints: yup.string().required("Referral Rewards is required"),

  walletAddress: yup.string().required("Wallet Address  is required"),
  joiningBonus: yup.string().required("Joining Bonus is required"),
  bettingPenalty: yup.string().required("Betting Penalty is required"),
  currency: yup.string().required("Currency is required"),
  coin: yup.string().required("Coin is required"),
  currencyValue: yup.string().required("Currency value is required"),
});

// privayPolicy
export const validationSchemaPrivayPolicy = yup.object().shape({
  title: yup
    .string()
    .required("Title  is required")
    .max(30, "Title allow only 30 characters "),
  description: yup
    .string()
    .required("Description is required")
    .min(200, "range of Min 200 to max 5000 characters.")
    .max(5000, "range of Min 200 to max 5000 characters."),
});

// Terms & Conditions
export const validationSchemaTermsConditions = yup.object().shape({
  title: yup
    .string()
    .required("Title  is required")
    .max(30, "Title allow only 30 characters "),
  description: yup
    .string()
    .required("Description is required")
    .min(800, " Range of min 800 to max 4000 characters.")
    .max(4000, " Range of min 800 to max 4000 characters."),
});

// Game Rules
export const validationSchemaGameRules = yup.object().shape({
  description: yup
    .string()
    .required("Description is required")
    .min(200, "Range of Min 200 to max 4000 characters.")
    .max(4000, "Range of min 800 to max 4000 characters."),
  // numberBetting: yup.
  // string()
  // .required('Number betting rules is required'),
  // penalityBetting: yup.
  // string()
  // .required('Penality betting rules is required'),
  // cardBetting: yup.
  // string()
  // .required('Card betting rules is required'),
  // firstColorBetting: yup.
  // string()
  // .required(' colors betting rules is required'),
  // secondColorBetting: yup.
  // string()
  // .required(' Colors betting rules is required'),
  // coummnityBetting: yup.
  // string()
  // .required('coummnity betting rules is required'),
});

//PlusTime
// export const validationSchemaPlusTime = yup.object().shape({
//   gameTime: yup.string().required("Game time is required"),
// });

// AddGame
export const validationSchemaAddGame = yup.object().shape({
  gameName: yup.string().required("Game name is required"),
  gameHours: yup
    .number()
    .required("Game bet timer is required")
    .test(
      "gameDurationRange",
      "Game bet time should be between 60 to 120 minutes",
      function (value) {
        return Number(value) >= 60 && Number(value) <= 120;
      }
    ),
  gameDurationFrom: yup.string().required("Game from time is required"),
  gameDurationTo: yup.string().required("Game to time is required"),
  gameImage: yup
    .mixed()
    //.required("Company logo is required")
    .test(
      "FILE_FORMAT",
      "Only jpg,jpeg,png allowed",
      (value) =>
        !value ||
        (["jpg", "jpeg", "png"].includes(
          value?.name?.substr(value?.name?.lastIndexOf(".") + 1)
        ) &&
          ["image/jpg", "image/jpeg", "image/png"].includes(value?.type))
    )
    .test("fileSize", "File size too large, max file size is 10 Mb", (file) => {
      if (file) {
        return file.size <= 2048000;
      } else {
        return true;
      }
    }),
  description: yup
    .string()
    // .min(200, 'Game description is Short!')
    .max(1000, "Game description is Long!")
    .required("Game description is required"),
  gameMode: yup.string().required("Mode is required"),
  winningCoin: yup.number().required("Winning Coin is required"),
  gameMinimumCoin: yup
    .number()
    .required("Minimum Coin is required")
    .min(50, "Minimum Coin should be 50 coin")
    .max(900, "Maximum Coin should be 900 coin"),
  gameMaximumCoin: yup
    .number()
    .required("Maximum Coin is required")
    .test(
      "maxMinCoins",
      "Maximum Coin must be greater Minimum Coin",
      function (value) {
        const minCoin = this.parent.gameMinimumCoin;
        return value > minCoin;
      }
    ),
  // week: yup.array()
  // .required("Week is required"),
  gameTimeFrom: yup.date().required("Start date is required"),
  gameTimeTo: yup
    .date()
    // .when("gameTimeTo", (gameTimeTo, schema) => {u
    //   return gameTimeTo
    //     ? schema.min(gameTimeTo, "End date must be greater than start date")
    //     : schema;
    // })
    .required("End date is required"),
});

export const validationSchemaColorBeatAddGame = yup.object().shape({
  gameName: yup.string().required("Game name is required"),
  // gameHours: yup.number().required("Game hours is required"),
  gameDurationFrom: yup.string().required("Game from duration is required"),
  gameDurationTo: yup.string().required("Game end duration is required"),
  // gameSecond: yup.string().required("Game second is required"),

  gameSecond: yup
    .array()
    .min(1, "Game second is required") // Minimum one selection required
    .of(yup.string().oneOf(["30", "60", "120", "80", "180"], "Invalid option"))
    .required("Game second is required"),
  // gameSecond: yup
  //   .array()
  //   .of(yup.number())
  //   .min(1, "Select at least one value for Game Second")
  //   .required("Game Second is required"),
  gameImage: yup
    .mixed()
    //.required("Company logo is required")
    .test(
      "FILE_FORMAT",
      "Only jpg,jpeg,png allowed",
      (value) =>
        !value ||
        (["jpg", "jpeg", "png"].includes(
          value?.name?.substr(value?.name?.lastIndexOf(".") + 1)
        ) &&
          ["image/jpg", "image/jpeg", "image/png"].includes(value?.type))
    )
    .test("fileSize", "File size too large, max file size is 10 Mb", (file) => {
      if (file) {
        return file.size <= 2048000;
      } else {
        return true;
      }
    }),
  description: yup
    .string()
    // .min(200, 'Game description is Short!')
    .max(1000, "Game description is Long!")
    .required("Game description is required"),
  gameMode: yup.string().required("Mode is required"),
  winningCoin: yup.number().required("Winning Coin is required"),
  gameMinimumCoin: yup.number().required("Minimum Coin is required"),
  gameMaximumCoin: yup
    .number()
    .required("Maximum Coin is required")
    .test(
      "maxMinCoins",
      "Maximum Coin must be greater Minimum Coin",
      function (value) {
        const minCoin = this.parent.gameMinimumCoin;
        return value > minCoin;
      }
    ),
  // week: yup.array()
  // .required("Week is required"),
  gameTimeFrom: yup.date().required("Start date is required"),
  gameTimeTo: yup
    .date()
    // .when("gameTimeTo", (gameTimeTo, schema) => {u
    //   return gameTimeTo
    //     ? schema.min(gameTimeTo, "End date must be greater than start date")
    //     : schema;
    // })
    .required("End date is required"),
});

export const validationCommunityBetting = yup.object().shape({
  gameImage: yup
    .mixed()
    //.required("Company logo is required")
    .test(
      "FILE_FORMAT",
      "Allow only jpg,jpeg,png file",
      (value) =>
        !value ||
        (["jpg", "jpeg", "png"].includes(
          value?.name?.substr(value?.name?.lastIndexOf(".") + 1)
        ) &&
          ["image/jpg", "image/jpeg", "image/png"].includes(value?.type))
    )
    .test(
      "fileSize",
      "File size too large, max file size is 2.048 Mb",
      (file) => {
        if (file) {
          return file.size <= 2048000;
        } else {
          return true;
        }
      }
    ),
  gameName: yup.string().required("Game name is required"),
  betAmount: yup.string().required("Entry Fee is required"),
  gameTimeFrom: yup.date().required("Start date is required"),
  gameTimeTo: yup.date().required("End date is required"),
  gameHours: yup
    .string()
    .required("Game duration is required")
    .test(
      "gameDurationRange",
      "Game duration should be between 60 to 120 minutes",
      function (value) {
        return Number(value) >= 60 && Number(value) <= 120;
      }
    ),
  gameWinningAmount: yup.string().required("Winning amount is required"),
  noOfWinners: yup.number().required("No Of winners is required"),
  gameTimeFrom: yup.date().required("Start date is required"),
  gameTimeTo: yup.date().required("End date is required"),
  gameMode: yup.string().required("Mode is required"),
  //  gameMaximumCoin: yup.string()
  //  .required("Maximum Coin is required"),
  //  gameMinimumCoin: yup.string()
  //  .required("Minimum Coin is required")
  gameMinimumCoin: yup
    .number()
    .required("Minimum Coin is required")
    .min(50, "Minimum Coin should be 50 coin")
    .max(900, "Maximum Coin should be 900 coin"),
  gameMaximumCoin: yup
    .number()
    .required("Maximum Coin is required")
    .test(
      "maxMinCoins",
      "Maximum Coin must be greater Minimum Coin",
      function (value) {
        const minCoin = this.parent.gameMinimumCoin;
        return value > minCoin;
      }
    ),
  time: yup
    .array()
    .of(
      yup.object().shape({
        winnersPercentage: yup
          .string()
          .required("Winner percentage is required"),
      })
    )
    .required("Winner percentage is required"),
  minSlot: yup.string().required("Minimum slot is required"),
  maxSlot: yup
    .string()
    .required("Maximum slot is required")
    .test(
      "is-greater-than-minSlot",
      "Maximun slot should not be less than minimum slot",
      function (value) {
        const { minSlot } = this.parent; // Accessing the value of minSlot
        if (!minSlot) return true;
        return Number(value) >= Number(minSlot);
      }
    ),
});

export const validationSchemaCardBetting = yup.object().shape({
  gameImage: yup
    .mixed()
    //.required("Company logo is required")
    .test(
      "FILE_FORMAT",
      "Only jpg,jpeg,png allowed",
      (value) =>
        !value ||
        (["jpg", "jpeg", "png"].includes(
          value?.name?.substr(value?.name?.lastIndexOf(".") + 1)
        ) &&
          ["image/jpg", "image/jpeg", "image/png"].includes(value?.type))
    )
    .test("fileSize", "File size too large, max file size is 10 Mb", (file) => {
      if (file) {
        return file.size <= 2048000;
      } else {
        return true;
      }
    }),
  gameName: yup.string().required("Game name is required"),
  gameHours: yup.number().required("Game bet timer is required"),
  gameDurationFrom: yup.string().required("Game from time is required"),
  gameDurationTo: yup.string().required("Game to time is required"),
  description: yup
    .string()
    .max(1000, "Game description is Long!")
    .required("Game description is required"),
  gameMode: yup.string().required("Mode is required"),
  gameMinimumCoin: yup
    .number()
    .required("Minimum Coin is required")
    .min(50, "Minimum Coin should be 50 coin")
    .max(900, "Maximum Coin should be 900 coin"),
  gameMaximumCoin: yup
    .number()
    .required("Maximum Coin is required")
    .test(
      "maxMinCoins",
      "Maximum Coin must be greater Minimum Coin",
      function (value) {
        const minCoin = this.parent.gameMinimumCoin;
        return value > minCoin;
      }
    ),
  gameTimeFrom: yup.date().required("Start date is required"),
  gameTimeTo: yup.date().required("End date is required"),
});

export const validationSchemaCurrency = yup.object().shape({
  coin: yup.string().required("Coin is required"),
  // currencyValue: yup.string().required("Please select your currency"),
  currencyValue: yup.string().required("Currency is required"),
});

// banner validation
export const validationSchemaBanner = yup.object().shape({
  bannerName: yup.string().required("Banner name is required"),
  // .matches(
  //   /^[A-Za-z][A-Za-z\s]*$/,
  //   "Allow only characters"
  // ),
  // coin: yup.string().required("Coin is required"),
  // currencyValue: yup.string().required('Please select your currency'),
  bannerDescription: yup
    .string()
    .min(200, "Restrict user at Min.200 – Max.2500 characters.")
    .max(2500, "Restrict user at Min.200 – Max.2500 characters.")
    .required("Banner description is required"),
  imageBanner: yup.mixed().required("Banner is required"),
  // .test(
  //   "FILE_FORMAT",
  //   "Allow only jpg,jpeg,png file",
  //   (value) =>
  //     !value ||
  //     (["jpg", "jpeg", "png"].includes(
  //       value?.name?.substr(value?.name?.lastIndexOf(".") + 1)
  //     ) &&
  //       ["image/jpg", "image/jpeg", "image/png"].includes(value?.type))
  // )
  // .test("fileSize", "File size too large, max file size is 10 Mb", (file) => {
  //   if (file) {
  //     return file.size <= 2048000;
  //   } else {
  //     return true;
  //   }
  // }),
});

// plusTable validation
export const validationPlusTableSchema = yup.object().shape({
  gameName: yup.string().required("Game name is required"),
  gameTime: yup
    .array()
    // .min(10, 'Banner description is Short!')
    // .max(200, 'Banner description is Long!')
    .required("Game duration  is required"),
});

// // Validation EditProfile
const digitsOnly = (value) =>
  /^\d*[\.{1}\d*]\d*$/.test(value) || value.length === 0;
const mobilePattern = (value) =>
  /^[1-9][0-9]*$/.test(value) || value.length === 0;
const textAndSpaceOnly = (value) =>
  /^[a-zA-Z]+(\s[a-zA-Z]*){0,2}$/.test(value) || value.length === 0;

export const profileValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .test("inputEntry", "First name allows only characters", textAndSpaceOnly)
    .test(
      "len",
      "First name allows maximum 35 characters",
      (val) => val.length <= 35
    ),
  lastName: yup
    .string()
    .required("Last name is required")
    .test("inputEntry", "Last name allows only characters", textAndSpaceOnly)
    .test(
      "len",
      "Last name allows maximum 35 characters",
      (val) => val.length <= 35
    ),
  email: yup
    .string()
    .email("Invalid email")
    .matches(
      /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
      "Enter the valid email"
    )
    .required("Email is required"),
  mobileNumber: yup
    .number()
    .required("Number is required")
    .min(10, "Number should be 10 digit"),

  // .test("inputEntry", "Mobile number should have digits only", digitsOnly)
  // .test("inputEntry", "Mobile number is not valid", mobilePattern),
  // .max(10, "Mobile number maximum length must be 10"),
  address: yup
    .string()
    .required("Address is required")
    .max(200, "More than 200 characters are not allowed"),
  // .max(200,"Address should be 200 characters long"),
  profileImage: yup
    .mixed()
    //.required("Company logo is required")
    .test(
      "FILE_FORMAT",
      "Allow only jpg,jpeg,png file",
      (value) =>
        !value ||
        (["jpg", "jpeg", "png"].includes(
          value?.name?.substr(value?.name?.lastIndexOf(".") + 1)
        ) &&
          ["image/jpg", "image/jpeg", "image/png"].includes(value?.type))
    )
    .test(
      "fileSize",
      "File size too large, max file size is 2.048 Mb",
      (file) => {
        if (file) {
          return file.size <= 2048000;
        } else {
          return true;
        }
      }
    ),
});

// user signup validation
export const userSignupValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email / phone number is required")
    .test(
      "is-phone",
      "Please enter a valid mobile number or email address",
      function (value) {
        const mobilePattern = /^[0-9]{10}$/;
        // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // const emailPattern = /^[a-z][a-z0-9]*(?:\.[a-z]+)*@[a-z]+\.[a-z]{2,}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (isNaN(value)) {
          if (emailPattern.test(value)) {
            return true;
          } else {
            return this.createError({
              path: "email",
              message: "Email is not valid",
            });
          }
        } else {
          if (mobilePattern.test(value) && Number(value) !== 0) {
            return true;
          } else {
            return this.createError({
              path: "email",
              message: "Phone number is not valid",
            });
          }
        }
      }
    ),
  name: yup
    .string()
    // .matches(/^[A-Z][A-Za-z\s]*$/, "First Letter should be capital")
    .required("Name is required")
    .matches(/^[^\s].*/, "Cannot start with a space")
    .max(25, "Name should not be more than 25 characters")
    .matches(/^[^\d]*$/, "Name must not contain numbers"),
  currencyValue: yup.string().required("Please select currency"),
});

// user login validation
export const userLoginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email / phone number is required")
    .test(
      "is-phone",
      "Please enter a valid mobile number or email address",
      function (value) {
        const mobilePattern = /^[0-9]{10}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (isNaN(value)) {
          if (emailPattern.test(value)) {
            return true;
          } else {
            return this.createError({
              path: "email",
              message: "Please enter a valid email",
            });
          }
        } else {
          if (mobilePattern.test(value) && Number(value) !== 0) {
            return true;
          } else {
            return this.createError({
              path: "email",
              message: "Please enter a valid phone number",
            });
          }
        }
      }
    ),
  // .test("is-email", "Invalid email", function (value) {
  //   if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
  //     return true;
  //   }
  //   return this.createError({
  //     path: "email",
  //     message: "Invalid email",
  //   });
  // })
});

// user password validation
export const userPasswordValidationSchemaSignUp = yup.object().shape({
  password: yup
    .string()
    .required("Password is required ")
    // .min(8, "Password is too short.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,20}$/,
      "Must contain 8 characters, one uppercase, one lowercase, one number and one special case characters"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Confirm password should match password")
    .required("Confirm password is required"),
});

export const userChangePassword = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, "Password is too short")
    .matches(
      passwordRegex,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required("New Password is required "),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "New password must match")
    .required("Confirm Password is required"),
  oldPassword: yup.string().required("Old Password is required "),
});

// user password with login validation
export const userPasswordValidationSchemaLogin = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      passwordRegex,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required("Password is a required "),
});

// user edit profile validation
export const userEditProfileSchema = yup.object().shape({
  Profile: yup
    .mixed()
    //.required("Company logo is required")
    .test(
      "FILE_FORMAT",
      "Allow only jpg,jpeg,png file",
      (value) =>
        !value ||
        (["jpg", "jpeg", "png"].includes(
          value?.name?.substr(value?.name?.lastIndexOf(".") + 1)
        ) &&
          ["image/jpg", "image/jpeg", "image/png"].includes(value?.type))
    )
    .test(
      "fileSize",
      "File size too large, max file size is 2.048 Mb",
      (file) => {
        if (file) {
          return file.size <= 2048000;
        } else {
          return true;
        }
      }
    ),
  name: yup
    .string()
    // .matches(/^[A-Z]/, "First Letter should be capital")
    .test("inputEntry", "Name allows only characters", textAndSpaceOnly)
    .min(2)
    .max(35)
    .required("Name is required"),
  profileImage: yup
    .mixed()
    // .required("Profile Image is required")
    .test(
      "FILE_FORMAT",
      "Allow only jpg,jpeg,png file",
      (value) =>
        !value ||
        (["jpg", "jpeg", "png"].includes(
          value?.name?.substr(value?.name?.lastIndexOf(".") + 1)
        ) &&
          ["image/jpg", "image/jpeg", "image/png"].includes(value?.type))
    )
    .test(
      "fileSize",
      "File size too large, max file size is 2.048 Mb",
      (file) => {
        if (file) {
          return file.size <= 2048000;
        } else {
          return true;
        }
      }
    ),
  name: yup
    .string()
    // .matches(/^[A-Z][A-Za-z\s]*$/, "First Letter should be capital")
    .matches(/^[^\s].*/, "Cannot start with a space")
    .min(2)
    .max(35)
    .required("Name is required"),
  email: yup
    .string()
    .email("Email is not valid")
    .required("Email is required")
    .matches(emailRegex, "Email is not valid"),
  mobileNumber: yup
    .string()
    // .required("Mobile number is required")
    .test("is-valid", "Please enter valid mobile number", function (value) {
      if (!value) return true;
      try {
        let metadata = parsePhoneNumberFromString(value);
        if (metadata && metadata?.isValid()) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log("752: ", error);
        return this.createError({
          path: "mobileNumber",
          // message: "Mobile number is required",
        });
      }
    }),
  // mobileNumber: yup
  //   .string()
  //   .required("Mobile number is required")
  //   .test("is-phone", "Please enter a valid mobile number", function (value) {
  //     const mobilePattern = /^[0-9]{10}$/;
  //     if (!isNaN(value) && mobilePattern.test(value) && Number(value) !== 0) {
  //       return true;
  //     } else {
  //       return this.createError({
  //         path: "mobileNumber",
  //         message: "Mobile number is not valid",
  //       });
  //     }
  //     console.log("Mobile number", value)
  //     return true;
  //   }),
});

// user add query validation
export const userQuerySchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[^\s].*/, "Cannot start with a space")
    .min(2)
    .max(35)
    .required("Name is required"),
  email: yup
    .string()
    .email("Email is not valid")
    .matches(emailRegex, "Email is not valid")
    .required("Email is required"),
  Description: yup.string().max(50).required("Description is required"),
  phoneNumber: yup
    .number()
    .min(1111111111, "Enter valid phone number")
    .max(9999999999)
    .required("Phone number is required"),
  file: yup.string().required("Upload file is required"),
});

// user deposit validation
export const userDepositSchema = yup.object().shape({
  Network: yup.string().required("Select a network"),
  value: yup
    .string()
    .matches(amountRegex, "Please enter valid value")
    .required("Value is required"),
});

// user withdrawal validation
export const userWithdrawal = yup.object().shape({
  network: yup.string().required("Select a network"),
  value: yup
    .string()
    .matches(amountRegex, "Please enter valid amount")
    .required("Value is required"),
});

// user add bank details validation
export const userBankDetails = yup.object().shape({
  bankName: yup
    .string()
    .max(40, "Bank name must be at most 40 characters")
    .matches(/^[^\d]*$/, "Bank name must not contain numbers")
    .required("Bank name is required"),
  branch: yup
    .string()
    .max(100, "Branch must be at most 100 characters")
    .required("Branch is required"),
  // .matches(/^[^\d]*$/, "Branch must not contain numbers"),,
  accountHolder: yup
    .string()
    .max(100)
    .required("Account holder name is required")
    .matches(/^[^\d]*$/, "Account holder name must not contain numbers"),
  accountNumber: yup
    .string()
    .min(14, "Account number must be at least 14 characters")
    .max(14, "Account number must be at most 14 characters")
    .required("Account number is required"),
  IFSCCode: yup
    .string()
    .max(11)
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Please enter valid IFSC code")
    .required("IFSC code is required"),
});

export const userNumberBetting = yup.object().shape({
  betTime: yup.string().required("Bet time is required"),
  selectBall: yup.string().required("select Ball is required"),
  betAmount: yup.string().required("Bet Amount is required"),
});

export const roleValidationSchema = yup.object().shape({
  Role_type: yup
    .string()
    .required("Role name is required")
    .test("roleName", "Role name allows only characters", textAndSpaceOnly)
    .max(20, "Role name allows maximum length 20"),
});

export const SubAdminSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "This is not a valid format")

    .required("Please enter your email"),
  firstName: yup
    .string()
    .required("Please enter your Firstname")
    .min(3, "Must contain 3 characters"),
  lastName: yup
    .string()
    .required("Please enter your Lastname")
    .min(3, "Must contain 3 characters"),
  role: yup.string().required("Please select your role"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,}$/,
      "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
    ),
});

export const EditSubAdminSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "This is not a valid format")

    .required("Please enter your email"),
  firstName: yup
    .string()
    .required("Please enter your Firstname")
    .min(3, "Must contain 3 characters"),
  lastName: yup
    .string()
    .required("Please enter your Lastname")
    .min(3, "Must contain 3 characters"),
  role: yup.string().required("Please select your role"),
});

// payment method validation
export const validationSchemaPayment = yup.object().shape({
  UpiID: yup
    .string()
    .required("UPI id is required")
    // .matches(
    //   /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    //   "Invalid UPI id format"  form .com
    // ),
    .matches(
      /^[a-zA-Z0-9@]+$/,
      "UPI ID must contain only letters, numbers, and @ symbol"
    ),
  // .matches(
  //   /^[A-Za-z][A-Za-z\s]*$/,
  //   "Allow only characters"
  // ),
  // coin: yup.string().required("Coin is required"),
  // currencyValue: yup.string().required('Please select your currency'),
  qrCode: yup.mixed().required("QR Image is required"),
  // .test(
  //   "FILE_FORMAT",
  //   "Allow only jpg,jpeg,png file",
  //   (value) =>
  //     !value ||
  //     (["jpg", "jpeg", "png"].includes(
  //       value?.name?.substr(value?.name?.lastIndexOf(".") + 1)
  //     ) &&
  //       ["image/jpg", "image/jpeg", "image/png"].includes(value?.type))
  // )
  // .test("fileSize", "File size too large, max file size is 10 Mb", (file) => {
  //   if (file) {
  //     return file.size <= 2048000;
  //   } else {
  //     return true;
  //   }
  // }),
});

export const selectPaymentMethodSchema = yup.object().shape({
  paymentMethod: yup.string().required("Please select a payment method"),
});

//validation Schema DepositReq Reject validation
export const validationSchemaDepositReqReject = yup.object().shape({
  rejectReason: yup
    .string()
    .required("Reject reason is required")
    .max(200, "Maximum 200 characters allowed"),
  rejectScreenShort: yup
    .mixed()
    .test(
      "fileType",
      "Invalid file type. Only jpg, jpeg or png file allowed.",
      (value) => {
        if (!value) return true; // Empty file is already caught by `required`
        return (
          value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
        );
      }
    ),
});

//validation Schema DepositReq Reject validation
export const validationSchemaDepositReqApproved = yup.object().shape({
  amount: yup.string().required("Amount is required"),
});

export const validationSchemaAdminUserTransaction = yup.object().shape({
  amount: yup.string().required("Amount is required"),
  type: yup.string().required("Please select your type"),
});

//validation Schema withdrwal approve validation
export const validationSchemaWithdrwalApproveReq = yup.object().shape({
  withdrawalApproveImg: yup
    .mixed()
    .test(
      "fileType",
      "Invalid file type. Only jpg, jpeg or png file allowed.",
      (value) => {
        if (!value) return true; // Empty file is already caught by `required`
        return (
          value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
        );
      }
    ),
});

export const manualPaymentMethodSchema = yup.object().shape({
  amount: yup
    .string()
    .matches(amountRegex, "Please enter valid amount")
    .required("Amount is required"),
  UPIMethod: yup.string().required("Please select a payment method"),
  UTRId: yup.string().required("Reference number is required"),
  // .min(12, "Reference number must be of 12 digits")
  // .max(12, "Reference number must be of 12 digits"),
  mobileNumber: yup
    .string()
    .required("Number is required")
    .min(10, "Number should be 10 digit")
    .max(10, "Number should be 10 digit"),
  transactionScreenShort: yup.mixed().required("Screenshot is required"),
  //   .test(
  //     "fileType",
  //     "Invalid file type. Only jpg, jpeg or png file allowed.",
  //     (value) => {
  //       // if (!value) return true; // Empty file is already caught by `required`
  //       return (
  //         value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
  //       );
  //     }
  //   ),
});

export const withdrawFiatCurrencySchema = yup.object().shape({
  withdrawalAmount: yup
    .string()
    .matches(amountRegex, "Please enter valid amount")
    .required("Withdrawal amount is required"),
  paymentMethod: yup.string().required("Select payment method"),
  // bankAccount: yup.string().required("Select bank account"),
  bankAccountId: yup
    .string()
    .test("bankAccountRequired", "Select bank account", function (value) {
      const paymentMethod = this.parent.paymentMethod;
      if (!paymentMethod) {
        return true;
      }
      if (paymentMethod === "Bank Account" && !value) {
        return false;
      } else {
        return true;
      }
    }),
  upiId: yup
    .string()
    .test("upiId required", "Upi Id is required", function (value) {
      const paymentMethod = this.parent.paymentMethod;
      if (!paymentMethod) {
        return true;
      }
      if (paymentMethod === "UPI" && !value) {
        return false;
      } else {
        return true;
      }
    }),
});

export const validationSchemaWithdrawalReqReject = yup.object().shape({
  rejectReason: yup
    .string()
    .required("Reject reason is required")
    .max(200, "Maximum 200 characters allowed"),
  // rejectScreenShort: yup
  //   .mixed()
  //   .test(
  //     "fileType",
  //     "Invalid file type. Only jpg, jpeg or png file allowed.",
  //     (value) => {
  //       if (!value) return true; // Empty file is already caught by `required`
  //       return (
  //         value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
  //       );
  //     }
  //   ),
});
