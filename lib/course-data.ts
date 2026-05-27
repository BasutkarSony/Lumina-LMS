export type CourseProvider =
  | "NPTEL"
  | "Stanford Online"
  | "DeepLearning.AI"
  | "freeCodeCamp"

export type CourseCategory = "AIML" | "Full Stack"
export type CourseDifficulty = "Beginner" | "Intermediate" | "Advanced"

export type CourseLesson = {
  id: string
  title: string
  duration: string
  youtubeUrl: string
  instructor: string
  moduleId: string
  notes: string
  completed: boolean
  locked: boolean
}

export type CourseModule = {
  id: string
  title: string
  lessons: CourseLesson[]
}

export type CourseAssignment = {
  id: string
  title: string
  dueDate: string
  status: "pending" | "submitted" | "graded" | "overdue"
}

export type CourseDetail = {
  slug: string
  title: string
  instructor: string
  provider: CourseProvider
  category: CourseCategory
  difficulty: CourseDifficulty
  enrolledStudents: number
  duration: string
  coverImage: string
  imageAlt: string
  description: string
  liveClassRoom: string
  modules: CourseModule[]
  assignments: CourseAssignment[]
  certificateRequiredProgress: number
  aiInsights: {
    summary: string
    conceptExplanation: string
    revisionSuggestion: string
    weakTopicSuggestion: string
  }
}

function lesson(
  id: string,
  moduleId: string,
  title: string,
  duration: string,
  youtubeUrl: string,
  instructor: string,
  notes: string,
  completed: boolean,
  locked: boolean
): CourseLesson {
  return {
    id,
    moduleId,
    title,
    duration,
    youtubeUrl,
    instructor,
    notes,
    completed,
    locked,
  }
}

export const courses: CourseDetail[] = [
  {
    slug: "deep-learning-fundamentals",
    title: "Deep Learning Fundamentals",
    instructor: "Provider: NPTEL",
    provider: "NPTEL",
    category: "AIML",
    difficulty: "Advanced",
    enrolledStudents: 2840,
    duration: "28h 30m",
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=75&auto=format&fit=crop",
    imageAlt: "Neural network visualization",
    description:
      "A structured NPTEL pathway through neural networks, optimization, regularization, and model evaluation.",
    liveClassRoom: "LuminaLMS_DL_Batch_A",
    certificateRequiredProgress: 80,
    aiInsights: {
      summary:
        "You have completed the mathematical foundations and are ready to strengthen backpropagation before the lab checkpoint.",
      conceptExplanation:
        "Backpropagation applies the chain rule layer-by-layer to distribute error and update weights efficiently during training.",
      revisionSuggestion:
        "Review the gradient descent notebook and complete the activation-function comparison before the next assignment.",
      weakTopicSuggestion:
        "Optimization stability - focus on learning rates, normalization, and vanishing gradients.",
    },
    modules: [
      {
        id: "dl-m1",
        title: "Module 1 - Foundations",
        lessons: [
          lesson(
            "dl-l1",
            "dl-m1",
            "Neural Networks and Learning Objectives",
            "18 min",
            "https://www.youtube.com/watch?v=aircAruvnKk",
            "NPTEL",
            "Build intuition for layers, weights, and how neural networks approximate complex functions.",
            true,
            false
          ),
        ],
      },
      {
        id: "dl-m2",
        title: "Module 2 - Core Concepts",
        lessons: [
          lesson(
            "dl-l2",
            "dl-m2",
            "Perceptrons, Activations, and Loss Functions",
            "22 min",
            "https://www.youtube.com/watch?v=UZDiGooFs54",
            "NPTEL",
            "Connect perceptrons, nonlinear activations, and objective functions for supervised learning.",
            true,
            false
          ),
        ],
      },
      {
        id: "dl-m3",
        title: "Module 3 - Intermediate Concepts",
        lessons: [
          lesson(
            "dl-l3",
            "dl-m3",
            "Gradient Descent and Backpropagation",
            "24 min",
            "https://www.youtube.com/watch?v=IHZwWFHWa-w",
            "NPTEL",
            "Trace forward pass, loss computation, backward pass, and optimizer updates.",
            false,
            false
          ),
        ],
      },
      {
        id: "dl-m4",
        title: "Module 4 - Practical Applications",
        lessons: [
          lesson(
            "dl-l4",
            "dl-m4",
            "Regularized Feedforward Network Lab",
            "32 min",
            "https://www.youtube.com/watch?v=Ilg3gGewQ5U",
            "NPTEL",
            "Train a multilayer network while comparing dropout, weight decay, and early stopping.",
            false,
            false
          ),
        ],
      },
      {
        id: "dl-m5",
        title: "Module 5 - Assignments",
        lessons: [
          lesson(
            "dl-l5",
            "dl-m5",
            "Assignment Brief: Training Diagnostics",
            "20 min",
            "https://www.youtube.com/watch?v=EvGMnjXzE28",
            "NPTEL",
            "Prepare experiments that explain underfitting, overfitting, and validation-curve behavior.",
            false,
            true
          ),
        ],
      },
      {
        id: "dl-m6",
        title: "Module 6 - Revision",
        lessons: [
          lesson(
            "dl-l6",
            "dl-m6",
            "Revision: Optimization and Generalization",
            "28 min",
            "https://www.youtube.com/watch?v=-7scWqLKOc8",
            "NPTEL",
            "Review activations, loss surfaces, learning rates, and regularization tradeoffs.",
            false,
            true
          ),
        ],
      },
      {
        id: "dl-m7",
        title: "Module 7 - Final Assessment",
        lessons: [
          lesson(
            "dl-l7",
            "dl-m7",
            "Final Assessment: Neural Network Case Study",
            "45 min",
            "https://www.youtube.com/watch?v=vT1nTJcgNJI",
            "NPTEL",
            "Submit a concise model report with architecture choices, training evidence, and evaluation.",
            false,
            true
          ),
        ],
      },
    ],
    assignments: [
      {
        id: "dl-a1",
        title: "Feedforward Network Lab Report",
        dueDate: "Jun 5, 2026",
        status: "submitted",
      },
      {
        id: "dl-a2",
        title: "Training Diagnostics Case Study",
        dueDate: "Jun 18, 2026",
        status: "pending",
      },
    ],
  },
  {
    slug: "natural-language-processing",
    title: "Natural Language Processing",
    instructor: "Provider: Stanford Online",
    provider: "Stanford Online",
    category: "AIML",
    difficulty: "Intermediate",
    enrolledStudents: 1920,
    duration: "22h 15m",
    coverImage:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=75&auto=format&fit=crop",
    imageAlt: "NLP and language models",
    description:
      "A Stanford sequence from text preprocessing and embeddings to attention, transformers, and applied NLP evaluation.",
    liveClassRoom: "LuminaLMS_NLP_Batch_B",
    certificateRequiredProgress: 80,
    aiInsights: {
      summary:
        "You have finished the foundations and should now connect embeddings to sequence modeling before the transformer unit.",
      conceptExplanation:
        "Self-attention computes relevance scores between all token pairs, enabling contextual representations.",
      revisionSuggestion:
        "Review tokenization, embedding spaces, and sequence-labeling examples before the attention workshop.",
      weakTopicSuggestion:
        "Sequence context - practice explaining how order and context change token representations.",
    },
    modules: [
      {
        id: "nlp-m1",
        title: "Module 1 - Foundations",
        lessons: [
          lesson(
            "nlp-l1",
            "nlp-m1",
            "NLP Tasks, Corpora, and Preprocessing",
            "78 min",
            "https://www.youtube.com/watch?v=8rXD5-xqv5I",
            "Stanford Online",
            "Survey core NLP tasks, text normalization, tokenization, and dataset assumptions.",
            true,
            false
          ),
        ],
      },
      {
        id: "nlp-m2",
        title: "Module 2 - Core Concepts",
        lessons: [
          lesson(
            "nlp-l2",
            "nlp-m2",
            "Word Vectors and Distributional Semantics",
            "55 min",
            "https://www.youtube.com/watch?v=ERibwqsaj28",
            "Stanford Online",
            "Word2Vec, GloVe, and distributed semantics for machine-readable text.",
            true,
            false
          ),
        ],
      },
      {
        id: "nlp-m3",
        title: "Module 3 - Intermediate Concepts",
        lessons: [
          lesson(
            "nlp-l3",
            "nlp-m3",
            "Sequence Models for Language",
            "52 min",
            "https://www.youtube.com/watch?v=2eWuYf-_z04",
            "Stanford Online",
            "Move from n-gram baselines to recurrent models, contextual encoders, and perplexity evaluation.",
            false,
            false
          ),
        ],
      },
      {
        id: "nlp-m4",
        title: "Module 4 - Practical Applications",
        lessons: [
          lesson(
            "nlp-l4",
            "nlp-m4",
            "Attention and Transformer Applications",
            "60 min",
            "https://www.youtube.com/watch?v=WCUNPb-5EYI",
            "Stanford Online",
            "Apply attention to translation, classification, and extractive question answering workflows.",
            false,
            true
          ),
        ],
      },
      {
        id: "nlp-m5",
        title: "Module 5 - Assignments",
        lessons: [
          lesson(
            "nlp-l5",
            "nlp-m5",
            "Assignment Brief: Transformer Attention Analysis",
            "42 min",
            "https://www.youtube.com/watch?v=XXTPJxYZEfU",
            "Stanford Online",
            "Inspect attention maps, explain model predictions, and compare baseline performance.",
            false,
            true
          ),
        ],
      },
      {
        id: "nlp-m6",
        title: "Module 6 - Revision",
        lessons: [
          lesson(
            "nlp-l6",
            "nlp-m6",
            "Revision: Embeddings to Transformers",
            "35 min",
            "https://www.youtube.com/watch?v=5vcj8k9D2DM",
            "Stanford Online",
            "Review tokenization, embeddings, sequence encoders, self-attention, and evaluation metrics.",
            false,
            true
          ),
        ],
      },
      {
        id: "nlp-m7",
        title: "Module 7 - Final Assessment",
        lessons: [
          lesson(
            "nlp-l7",
            "nlp-m7",
            "Final Assessment: NLP Model Report",
            "45 min",
            "https://www.youtube.com/watch?v=IU2fZhPZsTQ",
            "Stanford Online",
            "Submit a concise analysis of an NLP task, model choice, error patterns, and ethical considerations.",
            false,
            true
          ),
        ],
      },
    ],
    assignments: [
      {
        id: "nlp-a1",
        title: "Word Embedding Analysis",
        dueDate: "Jun 8, 2026",
        status: "graded",
      },
      {
        id: "nlp-a2",
        title: "Transformer Attention Visualization",
        dueDate: "Jun 20, 2026",
        status: "pending",
      },
    ],
  },
  {
    slug: "computer-vision-cnns",
    title: "Computer Vision & CNNs",
    instructor: "Provider: DeepLearning.AI",
    provider: "DeepLearning.AI",
    category: "AIML",
    difficulty: "Advanced",
    enrolledStudents: 1560,
    duration: "24h 45m",
    coverImage:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1200&q=75&auto=format&fit=crop",
    imageAlt: "Computer vision workspace",
    description:
      "A DeepLearning.AI pathway through image data, convolutional networks, transfer learning, and vision model evaluation.",
    liveClassRoom: "LuminaLMS_CV_Batch_C",
    certificateRequiredProgress: 80,
    aiInsights: {
      summary:
        "You are starting the CNN sequence; image tensors and convolution fundamentals are the priority this week.",
      conceptExplanation:
        "CNNs exploit spatial locality and parameter sharing to learn hierarchical visual features.",
      revisionSuggestion:
        "Complete the image preprocessing activity before joining the CNN architecture workshop.",
      weakTopicSuggestion:
        "Feature maps - sketch tensor shapes after each convolution and pooling step.",
    },
    modules: [
      {
        id: "cv-m1",
        title: "Module 1 - Foundations",
        lessons: [
          lesson(
            "cv-l1",
            "cv-m1",
            "Computer Vision Tasks and Image Tensors",
            "52 min",
            "https://www.youtube.com/watch?v=vT1nTJcgNJI",
            "DeepLearning.AI",
            "History, challenges, and the role of deep learning in modern vision.",
            false,
            false
          ),
        ],
      },
      {
        id: "cv-m2",
        title: "Module 2 - Core Concepts",
        lessons: [
          lesson(
            "cv-l2",
            "cv-m2",
            "Image Classification Pipeline",
            "38 min",
            "https://www.youtube.com/watch?v=o9e3SkXLVZQ",
            "DeepLearning.AI",
            "Data loading, augmentation, training loops, and evaluation metrics.",
            false,
            true
          ),
        ],
      },
      {
        id: "cv-m3",
        title: "Module 3 - Intermediate Concepts",
        lessons: [
          lesson(
            "cv-l3",
            "cv-m3",
            "Convolutions, Pooling, and Feature Maps",
            "45 min",
            "https://www.youtube.com/watch?v=2-vX5Y4pN28",
            "DeepLearning.AI",
            "Learn filters, stride, padding, pooling, and tensor-shape tracking in CNNs.",
            false,
            true
          ),
        ],
      },
      {
        id: "cv-m4",
        title: "Module 4 - Practical Applications",
        lessons: [
          lesson(
            "cv-l4",
            "cv-m4",
            "Transfer Learning for Image Classification",
            "40 min",
            "https://www.youtube.com/watch?v=gxnnoM49EQk",
            "DeepLearning.AI",
            "Fine-tune pretrained CNNs on a small labeled image dataset.",
            false,
            true
          ),
        ],
      },
      {
        id: "cv-m5",
        title: "Module 5 - Assignments",
        lessons: [
          lesson(
            "cv-l5",
            "cv-m5",
            "Assignment Brief: CNN Error Analysis",
            "28 min",
            "https://www.youtube.com/watch?v=CRgtZa5iF6Q",
            "DeepLearning.AI",
            "Analyze misclassified images, augmentation choices, and confusion-matrix patterns.",
            false,
            true
          ),
        ],
      },
      {
        id: "cv-m6",
        title: "Module 6 - Revision",
        lessons: [
          lesson(
            "cv-l6",
            "cv-m6",
            "Revision: CNN Architecture Decisions",
            "35 min",
            "https://www.youtube.com/watch?v=AI7sMU3wG-o",
            "DeepLearning.AI",
            "Review convolution blocks, pooling, regularization, transfer learning, and evaluation.",
            false,
            true
          ),
        ],
      },
      {
        id: "cv-m7",
        title: "Module 7 - Final Assessment",
        lessons: [
          lesson(
            "cv-l7",
            "cv-m7",
            "Final Assessment: Vision Model Submission",
            "50 min",
            "https://www.youtube.com/watch?v=nDPWyGW-tiY",
            "DeepLearning.AI",
            "Submit a trained image classifier with architecture notes, validation metrics, and error analysis.",
            false,
            true
          ),
        ],
      },
    ],
    assignments: [
      {
        id: "cv-a1",
        title: "Image Preprocessing Lab",
        dueDate: "Jun 12, 2026",
        status: "pending",
      },
      {
        id: "cv-a2",
        title: "CNN Error Analysis Report",
        dueDate: "Jun 24, 2026",
        status: "pending",
      },
    ],
  },
  {
    slug: "full-stack-react-nextjs",
    title: "Full Stack React & Next.js",
    instructor: "Provider: freeCodeCamp",
    provider: "freeCodeCamp",
    category: "Full Stack",
    difficulty: "Intermediate",
    enrolledStudents: 3210,
    duration: "32h 10m",
    coverImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=75&auto=format&fit=crop",
    imageAlt: "Web development workspace",
    description:
      "Build production React and Next.js applications with freeCodeCamp and modern App Router patterns.",
    liveClassRoom: "LuminaLMS_React_Batch_D",
    certificateRequiredProgress: 75,
    aiInsights: {
      summary:
        "Strong progress on React fundamentals; Server Components are the active learning zone.",
      conceptExplanation:
        "Server Components render on the server, sending HTML to the client and reducing JavaScript bundle size.",
      revisionSuggestion:
        "Rebuild the Lumina LMS sidebar exercise using Next.js layouts and nested routes.",
      weakTopicSuggestion:
        "Data fetching boundaries - practice loading states with Suspense.",
    },
    modules: [
      {
        id: "fs-m1",
        title: "Module 1 - Foundations",
        lessons: [
          lesson(
            "fs-l1",
            "fs-m1",
            "React Components, Props, and State",
            "45 min",
            "https://www.youtube.com/watch?v=RVnARGvhsfQ",
            "freeCodeCamp",
            "Components, props, state, and the React rendering model.",
            true,
            false
          ),
        ],
      },
      {
        id: "fs-m2",
        title: "Module 2 - Core Concepts",
        lessons: [
          lesson(
            "fs-l2",
            "fs-m2",
            "Hooks and Component State",
            "38 min",
            "https://www.youtube.com/watch?v=TNhaISOUy6Q",
            "freeCodeCamp",
            "useState, useEffect, useContext, and custom hook patterns.",
            true,
            false
          ),
        ],
      },
      {
        id: "fs-m3",
        title: "Module 3 - Intermediate Concepts",
        lessons: [
          lesson(
            "fs-l3",
            "fs-m3",
            "Next.js App Router and Layouts",
            "25 min",
            "https://www.youtube.com/watch?v=7o5FPaKlToY",
            "freeCodeCamp",
            "Use file-based routes, nested layouts, and shared UI structure in a modern Next.js app.",
            true,
            false
          ),
        ],
      },
      {
        id: "fs-m4",
        title: "Module 4 - Practical Applications",
        lessons: [
          lesson(
            "fs-l4",
            "fs-m4",
            "Server Components and Data Fetching",
            "30 min",
            "https://www.youtube.com/watch?v=__mSgDFCEzY",
            "freeCodeCamp",
            "Implement server-rendered course data, loading states, and route-level organization.",
            true,
            false
          ),
        ],
      },
      {
        id: "fs-m5",
        title: "Module 5 - Assignments",
        lessons: [
          lesson(
            "fs-l5",
            "fs-m5",
            "Assignment Brief: LMS Course Module",
            "42 min",
            "https://www.youtube.com/watch?v=5XrQHXI94Js",
            "freeCodeCamp",
            "Build a course-detail workflow with reusable components, route params, and realistic state.",
            false,
            false
          ),
        ],
      },
      {
        id: "fs-m6",
        title: "Module 6 - Revision",
        lessons: [
          lesson(
            "fs-l6",
            "fs-m6",
            "Revision: Full Stack App Router Patterns",
            "35 min",
            "https://www.youtube.com/watch?v=1WUiWOgt3Mo",
            "freeCodeCamp",
            "Review routing, server/client boundaries, form handling, and deployment concerns.",
            false,
            true
          ),
        ],
      },
      {
        id: "fs-m7",
        title: "Module 7 - Final Assessment",
        lessons: [
          lesson(
            "fs-l7",
            "fs-m7",
            "Final Assessment: Full Stack Capstone Review",
            "28 min",
            "https://www.youtube.com/watch?v=2QgOMOYPlBg",
            "freeCodeCamp",
            "Package the Lumina LMS capstone with routing, data flow, accessibility, and deployment notes.",
            false,
            true
          ),
        ],
      },
    ],
    assignments: [
      {
        id: "fs-a1",
        title: "React Component Library",
        dueDate: "Jun 3, 2026",
        status: "graded",
      },
      {
        id: "fs-a2",
        title: "Lumina LMS Course Module",
        dueDate: "Jun 22, 2026",
        status: "pending",
      },
    ],
  },
]

export function getCourseBySlug(slug: string): CourseDetail | undefined {
  return courses.find((c) => c.slug === slug)
}

export function getAllCourseSlugs(): string[] {
  return courses.map((c) => c.slug)
}

export function getAllLessons(course: CourseDetail): CourseLesson[] {
  return course.modules.flatMap((m) => m.lessons)
}

export function getLessonById(
  course: CourseDetail,
  lessonId: string
): CourseLesson | undefined {
  return getAllLessons(course).find((l) => l.id === lessonId)
}

export function getAdjacentLessons(course: CourseDetail, lessonId: string) {
  const lessons = getAllLessons(course)
  const index = lessons.findIndex((l) => l.id === lessonId)
  return {
    prev: index > 0 ? lessons[index - 1] : null,
    next: index < lessons.length - 1 ? lessons[index + 1] : null,
  }
}

export function computeProgressPercent(
  course: CourseDetail,
  completedIds: string[]
): number {
  const total = getAllLessons(course).length
  if (total === 0) return 0
  const completed = completedIds.length
  return Math.round((completed / total) * 100)
}

export function getResumeLesson(
  course: CourseDetail,
  completedIds: string[]
): CourseLesson {
  const lessons = getAllLessons(course)
  const firstIncomplete = lessons.find((l) => !completedIds.includes(l.id) && !l.locked)
  return firstIncomplete ?? lessons[lessons.length - 1]
}

export function isLessonAccessible(
  course: CourseDetail,
  lessonId: string,
  completedIds: string[]
): boolean {
  const lessons = getAllLessons(course)
  const index = lessons.findIndex((l) => l.id === lessonId)
  if (index === -1) return false
  const lesson = lessons[index]
  if (!lesson.locked) return true
  if (index === 0) return true
  const prev = lessons[index - 1]
  return completedIds.includes(prev.id)
}

export const JITSI_BASE_URL = "https://meet.jit.si/"

export function getLiveClassUrl(room: string): string {
  return `${JITSI_BASE_URL}${room}`
}
