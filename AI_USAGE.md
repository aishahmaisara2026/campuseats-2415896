# AI usage Log

## Week 1
- Tool(s): ChatGPT and Gemini
- What I asked for: Provide me a clear view of lab 1 requirements, JSX syntax, setting up GitHub properly and debugging.
- What I kept, changed or rejected, and why: I changed the vendor and menu item information to match my dream cafe.
- One thing the AI got wrong and how I fixed it: I checked the AI code with the code prepared by the lecturer and corrected any parts that did not follow the steps as guided in the lab sheets.

## Week 2
- Tool(s): ChatGPT and Gemini
- What I asked for: Provide me a clear view of lab 2 requirements, drafting my desired feature to be applied on the website and debugging.
- What I kept, changed or rejected, and why: I add new vendor and new menu list as well as creating my own repository to keep all my vendor list and menu that is available.
- One thing the AI got wrong and how I fixed it: I checked the AI code with the code prepared by the lecturer and corrected any parts that did not follow the steps as guided in the lab sheets.

## Week 3
- Tool(s): Gemini
- What I asked for: Provide me a clear view of Week 3 requirements, drafting my desired feature to be applied on the website and debugging for any error that caused by my carelessness.
- What I kept, changed or rejected, and why: I design my website with my desired layout and adding new vendors created by my friends.
- One thing the AI got wrong and how I fixed it: I checked the outputs prepared by the AI code for testing to check if it match my preference before applying it to my website. This is to ensure that i achieved my desired desing, layout and structure for the website. Mostly, the AI does not get wrong, they just does not match my preference. Therefore, i changed the part where i feel like i do not want it to be for my website.

##Week 4
- Tool(s): Gemini
- What I asked for: Provide me a clear view of Week 4 requirements, drafting my personal feature enhancement to be applied on the website and debugging for any error that caused by my carelessness.
- What I kept, changed or rejected, and why: I add features like "Seacrh Bar..." inside VendorPage to facilitate user navigation actions in order to make it easier for the user to search for food by any key words they type in.
- One thing the AI got wrong and how I fixed it: I suggested the AI to manage the dietary filter tags using standard react state (useState). While this worked visually on the page, it failed to meet the persistence and deep-linking requirements because refreshing the page or copying the URL reset all selected tag filters. I fixed this by refactoring the implementation to use react-router’s useSearchParams hook instead, deriving selectedTags directly from searchParams.get('tags') and updating the URL query string via setSearchParams.

## Week 5
- Tool(s): Gemini
- What I asked for: Help me draft my personal feature requirements, the purpose of creating firebase and debugging .
- What I kept, changed or rejected, and why: Previously, when user ticked a tag, it will appear on the browser address bar as a URL query parameter. However, in this lab, I replace this feature with a personal user local storage persistence that allow user to save their ticked tags directly in the local storage instead of the temporary memory. This increase user privacy as user activity does not appear on the browser  address bar and improve personalization as the ticked tags does not vanished once the user refresh the screen.
- One thing the AI got wrong and how I fixed it: I asked AI to improve my personal feature by checking the code that i has wrote so it follow the lab requirement. As i go through the website, i notice that my ticked tags does not remain at its latest ticked tags when i refresh the page. Therefore, i open the DevTools to identify the problems and check Local Storage on application, where i notice my key "ce-diet-<uid>" give value of the same ticked tags everytime i refresh. I fixed this problem by updating my hooks on useLocalStorage, where it miss some commands.

## Week 6

- Tool(s): Gemini
- What I asked for: Help me for updating my OrdersPage, CartPage and VendorPage as it require new import from services and hooks. I also asked for help in migrating my CampusEats order lifecyle and my dietary tag filter from localStorage and client side filtering to Cloud Firestore, as well as debugging and query mismatches that came up while testing everything together. 
- What I kept, changed or rejected, and why: I kept my existing cart item structure {id, name, price, quantity, vendorId, vendorName} and my dietary tags instead of rewriting my whole CartProvider to use nested {item,qty} objects because asking placeOrders in orders.js to read my cart structure was cleaner and prevent breaking my toast notifications and cart controls at the header. I also chnaged CartProvider to remove 'campuseats-orders' from localStorage and introduce clearCart, updated OrdersPage to listen to listen to live Firestore data via useMyOrders, and created the required firestore composite index of studentId and createdAt so my order history would load properly.
- One thing the AI got wrong and how I fixed it: At first, the AI assumed orderActions and OrderStatus used default exports and also reference a changePickupTime function that had not been written in services/orders.js yet, which caused errors when loading the My Orders page. I fixed this by aligning the name and default exports across my components and adding the missing changePickupTime in the services/orders.js. 