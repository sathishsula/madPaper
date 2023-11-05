4 question 
A snippet
1
// Find the register button
val registerButton = findViewById<Button>(R.id.register_button)

// Set an OnClickListener for the register button
registerButton.setOnClickListener {
    // Start the RegisterActivity
    startActivity(Intent(this, RegisterActivity::class.java))
}
2
// Find the login button
val loginButton = findViewById<Button>(R.id.login_button)

// Set an OnClickListener for the login button
loginButton.setOnClickListener {
    // Get the username and password from the EditText fields
    val usernameEditText = findViewById<EditText>(R.id.username_edit_text)
    val passwordEditText = findViewById<EditText>(R.id.password_edit_text)
    val username = usernameEditText.text.toString()
    val password = passwordEditText.text.toString()

    // Check if the username and password match the admin credentials
    if (username == "Admin" && password == "admin@123") {
        // Start the AdminActivity
        startActivity(Intent(this, AdminActivity::class.java))
    } else {
        // Display a Toast message informing the user that the login credentials are incorrect
        Toast.makeText(this, "Incorrect login credentials", Toast.LENGTH_SHORT).show()
    }
}
3
// Check if the password is wrong
if (password != "admin@123") {
    // Display a Toast message informing the admin that the password is wrong
    Toast.makeText(this, "Incorrect password", Toast.LENGTH_SHORT).show()
}
B
1
@Dao
interface UserDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertUser(user: User)

    @Query("SELECT * FROM User WHERE id = :id")
    suspend fun getUserById(id: Int): User?

    @Query("SELECT * FROM User")
    suspend fun getAllUsers(): List<User>

    @Update
    suspend fun updateUser(user: User)

    @Delete
    suspend fun deleteUser(user: User)
}
2
class UserRepository(private val userDao: UserDao) {
    suspend fun createUser(user: User) {
        userDao.insertUser(user)
    }

    suspend fun getUserById(id: Int): User? {
        return userDao.getUserById(id)
    }

    suspend fun getAllUsers(): List<User> {
        return userDao.getAllUsers()
    }

    suspend fun updateUser(user: User) {
        userDao.updateUser(user)
    }

    suspend fun deleteUser(user: User) {
        userDao.deleteUser(user)
    }
}
3
// Get the user details from the EditText fields
val usernameEditText = findViewById<EditText>(R.id.username_edit_text)
val emailEditText = findViewById<EditText>(R.id.email_edit_text)
val passwordEditText = findViewById<EditText>(R.id.password_edit_text)
val retypePasswordEditText = findViewById<EditText>(R.id.retype_password_edit_text)

val username = usernameEditText.text.toString()
val email = emailEditText.text.toString()
val password = passwordEditText.text.toString()
val retypePassword = retypePasswordEditText.text.toString()

// Validate the user details
if (username.isEmpty()) {
    Toast.makeText(this, "Username cannot be empty", Toast.LENGTH_SHORT).show()
    return
}

if (!email.isEmailValid()) {
    Toast.makeText(this, "Invalid email address", Toast.LENGTH_SHORT).show()
    return
}

if (password.isEmpty()) {
    Toast.makeText(this, "Password cannot be empty", Toast.LENGTH_SHORT).show()
    return
}

if (password != retypePassword) {
    Toast.makeText(this, "Passwords do not match", Toast.LENGTH_SHORT).show()
    return
}

// Create a new user object
val user = User(username, email, password)

// Save the user to the database
userRepository.createUser(user)

// Display a success message to the user
Toast.makeText(this, "User registered successfully", Toast.LENGTH_SHORT).show()

C
1
class BeverageViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
    val beverageName: TextView = itemView.findViewById(R.id.beverageName)
    val deleteButton: Button = itemView.findViewById(R.id.deleteButton)
}
..
override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): BeverageViewHolder {
    val view = LayoutInflater.from(parent.context).inflate(R.layout.beverage_item, parent, false)
    return BeverageViewHolder(view)
}
2
override fun onBindViewHolder(holder: BeverageViewHolder, position: Int) {
    val beverage = beverages[position]
    holder.beverageName.text = beverage.name

    // Check if the beverage is selected
    if (beverage.isSelected) {
        holder.deleteButton.setOnClickListener {
            // Delete the beverage
            beverages.remove(position)
            notifyItemRemoved(position)
        }
    } else {
        // Disable the delete button
        holder.deleteButton.isEnabled = false
    }
}
3
val alertDialogBuilder = AlertDialog.Builder(this)
alertDialogBuilder.setTitle("Add Beverage")
alertDialogBuilder.setMessage("Enter the name of the beverage:")

val input = EditText(this)
alertDialogBuilder.setView(input)

alertDialogBuilder.setPositiveButton("Add") { dialog, _ ->
    // Get the beverage name from the input field
    val beverageName = input.text.toString()

    // Create a new beverage object and add it to the list
    val beverage = Beverage(beverageName)
    beverages.add(beverage)

    // Notify the adapter that a new item has been added
    notifyItemInserted(beverages.size - 1)

    dialog.dismiss()
}

alertDialogBuilder.setNegativeButton("Cancel") { dialog, _ ->
    dialog.dismiss()
}

val alertDialog = alertDialogBuilder.create()
alertDialog.show()
.
adapter
class BeverageAdapter(private val beverages: List<Beverage>) : RecyclerView.Adapter<BeverageViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): BeverageViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.beverage_item, parent, false)
        return BeverageViewHolder(view)
    }

    override fun onBindViewHolder(holder: BeverageViewHolder, position: Int) {
        val beverage = beverages[position]
        holder.beverageName.text = beverage.name

        // Check if the beverage is selected
        if (beverage.isSelected) {
            holder.deleteButton.setOnClickListener {
                // Delete the beverage
                beverages.remove(position)
                notifyItemRemoved(position)
            }
        } else {
            // Disable the delete button
            holder.deleteButton.isEnabled = false
        }
    }

    override fun getItemCount(): Int {
        return beverages.size
    }

    // Add a new beverage to the list
    fun addBeverage(beverage: Beverage) {
        beverages.add(beverage)
        notifyItemInserted(beverages.size - 1)
    }
}


3 question 
A snippet
class Drink:
  id: int
  name: str
  description: str
  price: float

class Order:
  id: int
  drink_id: int
  customer_id: int
  status: str
  created_at: datetime
B snippet

| Activity Name | Views |
|---|---|---|
| Login Activity | TextView Login, EditText - username, EditText - password, Button-Login, Button-Register |
| Register Activity | TextView Register, EditText - username, EditText - email, EditText - password, Button-Register, Button-Cancel |
| Home Activity | RecyclerView (to show a list of drinks), Button-Add Drink, Button-Cart |
| Drink Details Activity | TextView Drink Name, TextView Drink Description, TextView Drink Price, Button-Add to Cart |
| Cart Activity | RecyclerView (to show a list of drinks in the cart), TextView Total Price, Button-Checkout |
| Checkout Activity | EditText - Name, EditText - Address, EditText - Phone Number, Button-Checkout |
| Order Confirmation Activity | TextView Order ID, TextView Order Date, TextView Order Total, TextView Order Items, Button-OK |
C snippet
From Login Activity to Register Activity:
From Register Activity to Home Activity:
From Home Activity to Drink Details Activity:
From Drink Details Activity to Cart Activity:
From Cart Activity to Checkout Activity:
From Checkout Activity to Order Confirmation Activity: