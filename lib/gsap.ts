"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"
import { Flip } from "gsap/Flip"

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, Flip)

export { gsap, ScrollTrigger, SplitText, ScrambleTextPlugin, Flip }
