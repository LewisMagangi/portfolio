// Books Lewis intends to read, from the technical folders of his own library (titles and authors only).
// For the Reading page's "Up next" shelf (Admin › Books). Already reading, and shown as such elsewhere:
// Designing Data-Intensive Applications (1st ed), AI Engineering, Hands-On Machine Learning.

export type UpNext = { title: string; author: string; topic: string }

export const UP_NEXT: UpNext[] = [
  // AI and ML
  { title: "Designing Machine Learning Systems", author: "Chip Huyen", topic: "AI and ML" },
  { title: "Build a Large Language Model (From Scratch)", author: "Sebastian Raschka", topic: "AI and ML" },
  { title: "Hands-On Large Language Models", author: "Jay Alammar", topic: "AI and ML" },
  { title: "Natural Language Processing with Transformers", author: "Lewis Tunstall", topic: "AI and ML" },
  { title: "Practical MLOps", author: "Noah Gift", topic: "AI and ML" },
  { title: "The Hundred-Page Machine Learning Book", author: "Andriy Burkov", topic: "AI and ML" },
  { title: "Deep Learning with Python", author: "François Chollet", topic: "AI and ML" },
  { title: "Deep Learning", author: "Ian Goodfellow", topic: "AI and ML" },
  { title: "Mathematics for Machine Learning", author: "Marc Peter Deisenroth", topic: "AI and ML" },
  { title: "Practical Deep Learning for Cloud, Mobile and Edge", author: "Anirudh Koul", topic: "AI and ML" },
  { title: "If Anyone Builds It, Everyone Dies", author: "Eliezer Yudkowsky", topic: "AI and ML" },
  // Data
  { title: "Designing Data-Intensive Applications, second edition", author: "Martin Kleppmann and Chris Riccomini", topic: "Data" },
  { title: "Fundamentals of Data Engineering", author: "Joe Reis", topic: "Data" },
  { title: "Database Internals", author: "Alex Petrov", topic: "Data" },
  { title: "Data Science from Scratch", author: "Joel Grus", topic: "Data" },
  { title: "Practical Statistics for Data Scientists", author: "Peter Gedeck", topic: "Data" },
  { title: "Software Engineering for Data Scientists", author: "Catherine Nelson", topic: "Data" },
  // Systems and architecture
  { title: "Understanding Distributed Systems", author: "Roberto Vitillo", topic: "Systems" },
  { title: "A Philosophy of Software Design", author: "John Ousterhout", topic: "Systems" },
  { title: "System Design Interview, Volume 2", author: "Alex Xu and Sahn Lam", topic: "Systems" },
  { title: "Fundamentals of Software Architecture, second edition", author: "Mark Richards", topic: "Systems" },
  { title: "Software Architecture", author: "Raju Gandhi", topic: "Systems" },
  { title: "The Software Engineer’s Guidebook", author: "Gergely Orosz", topic: "Systems" },
  { title: "Computer Systems: A Programmer’s Perspective", author: "Randal Bryant and David O’Hallaron", topic: "Systems" },
  { title: "Operating Systems: Three Easy Pieces", author: "Remzi Arpaci-Dusseau", topic: "Systems" },
  // APIs and algorithms
  { title: "API Design Patterns", author: "JJ Geewax", topic: "APIs" },
  { title: "Designing Web APIs", author: "Brenda Jin, Saurabh Sahni and Amir Shevat", topic: "APIs" },
  { title: "RESTful Web APIs", author: "Leonard Richardson, Mike Amundsen and Sam Ruby", topic: "APIs" },
  { title: "Grokking Algorithms, second edition", author: "Aditya Bhargava", topic: "Algorithms" },
  { title: "Algorithms", author: "Robert Sedgewick and Kevin Wayne", topic: "Algorithms" },
  { title: "Introduction to Algorithms, fourth edition", author: "Thomas H. Cormen", topic: "Algorithms" },
  { title: "Cracking the Coding Interview", author: "Gayle Laakmann McDowell", topic: "Algorithms" },
  { title: "Algorithms to Live By", author: "Brian Christian and Tom Griffiths", topic: "Algorithms" },
]
