// AI and ML page content, verbatim from design/v8/boards/AI-ML.dc.html and content.json › aiMlPage.

export type Track = { issuer: string; meta: string; title: string; summary: string; skills: { h: string; t: string }[]; verify?: string }

export const INTRO = {
  title: "Shipping models like I ship software.",
  lead: "I’m moving from full stack into AI and ML engineering, building on what I already do well: APIs, data models, deployment and security.",
}

export const BANNER = {
  eyebrow: "Finished, DataCamp career track",
  title: "Machine Learning Engineer",
  status: "Completed 9 Nov 2026",
}

// The ML Engineer card has no public verify link yet, so it shows none.
export const TRACKS: Track[] = [
  {
    issuer: "DataCamp, career track",
    meta: "Nov 2026, 43 hr",
    title: "Machine Learning Engineer",
    summary: "Twelve courses on building, shipping and looking after machine learning models in production.",
    skills: [
      { h: "Supervised learning", t: "classification, regression, fine tuning, preprocessing and pipelines in scikit-learn" },
      { h: "MLOps", t: "designing, developing, deploying and maintaining models in production, and the deployment life cycle" },
      { h: "MLflow", t: "experiment tracking, packaged models, the model registry and MLflow Projects" },
      { h: "Data pipelines", t: "ETL and ELT in Python, from building to deploying and maintaining a pipeline" },
      { h: "Data quality", t: "Great Expectations: connecting to data and writing expectations that run in practice" },
      { h: "DVC", t: "versioning data, configuring storage and automating pipelines" },
      { h: "Model monitoring", t: "covariate shift and concept drift detection, performance estimation, root cause analysis" },
      { h: "Docker", t: "running containers, writing your own images and keeping them secure" },
      { h: "CI/CD for ML", t: "GitHub Actions, continuous integration for models, comparing training runs, tuning hyperparameters" },
      { h: "Shell", t: "files and data on the command line, batch processing and building small tools" },
    ],
  },
  {
    verify: "https://drive.google.com/file/d/1hwtO1PBwQ1Dx-2wGyDWw6puYhVRIpx-Z/view?usp=sharing",
    issuer: "DataCamp, track",
    meta: "Aug 2026, 29 hr",
    title: "Associate AI Engineer for Developers",
    summary: "Adding AI to real software through APIs and open source libraries.",
    skills: [
      { h: "LLM APIs", t: "OpenAI API and Responses API, structured outputs, handling rate limits and errors" },
      { h: "Prompt engineering", t: "prompting patterns and best practices for GPT models" },
      { h: "Hugging Face", t: "finding and running models and datasets from the Hub" },
      { h: "Embeddings & vector search", t: "semantic search and recommendations, Pinecone vector database" },
      { h: "LangChain", t: "LLM apps built from prompts, chains and agents" },
      { h: "LLMOps & MCP", t: "the LLM lifecycle to deployment; connecting AI apps to tools via Model Context Protocol" },
      { h: "Python engineering", t: "modular, documented, tested code" },
    ],
  },
  {
    issuer: "DataCamp, track",
    meta: "Oct 2026, 14 hr",
    title: "Machine Learning in Production in Python",
    summary: "Taking models out of notebooks and keeping them healthy in production.",
    skills: [
      { h: "MLOps", t: "the model lifecycle from experiment to deployed, valuable system" },
      { h: "MLflow", t: "experiment tracking, packaging projects, model registry" },
      { h: "Model monitoring", t: "detecting data drift, concept drift and performance decay" },
      { h: "Monitoring in Python", t: "building a basic monitoring system for a deployed model" },
      { h: "DVC", t: "versioning data, automated pipelines and model evaluation" },
    ],
  },
]

export const BOOKS = [
  { label: "Reading, chapter 10", title: "Designing Data‑Intensive Applications", note: "Batch processing. The second edition comes after." },
  { label: "Reading, chapter 4", title: "AI Engineering", note: "Evaluating AI systems." },
  { label: "Reading, chapter 4", title: "Hands‑On Machine Learning with Scikit-Learn, Keras & TensorFlow", note: "Training models: mini batch gradient descent." },
]
