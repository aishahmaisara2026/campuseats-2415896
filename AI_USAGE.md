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