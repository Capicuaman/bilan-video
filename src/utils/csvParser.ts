import { parse } from 'csv-parse/sync';
import * as fs from 'fs';
import * as path from 'path';

export interface VideoData {
  id: string;
  type: 'Educational' | 'Mythbusting' | 'QuickTip' | 'Trending';
  title: string;
  // Educational
  hook?: string;
  mainPoints?: string[];
  conclusion?: string;
  // Mythbusting
  myth?: string;
  truth?: string;
  explanation?: string;
  // QuickTip
  tip?: string;
  reason?: string;
  // Trending
  scenes?: string[];
  trendingFormat?: 'transformation' | 'pov' | 'challenge' | 'duet';
  // Common
  cta: string;
  brandColor?: string;
}

export function parseCSV(csvPath: string): VideoData[] {
  const absolutePath = path.resolve(csvPath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  return records.map((record: any) => {
    const video: VideoData = {
      id: record.id,
      type: record.type,
      title: record.title,
      cta: record.cta,
      brandColor: record.brandColor || '#00a86b',
    };

    switch (record.type) {
      case 'Educational':
        video.hook = record.hook;
        video.mainPoints = record.mainPoints?.split('|').map((p: string) => p.trim()) || [];
        video.conclusion = record.conclusion;
        break;
      case 'Mythbusting':
        video.myth = record.myth;
        video.truth = record.truth;
        video.explanation = record.explanation;
        break;
      case 'QuickTip':
        video.tip = record.tip;
        video.reason = record.reason;
        break;
      case 'Trending':
        video.hook = record.hook;
        video.scenes = record.scenes?.split('|').map((s: string) => s.trim()) || [];
        video.trendingFormat = record.trendingFormat || 'transformation';
        break;
    }

    return video;
  });
}

export function getCompositionId(type: string): string {
  const map: Record<string, string> = {
    'Educational': 'Educational',
    'Mythbusting': 'Mythbusting',
    'QuickTip': 'QuickTip',
    'Trending': 'Trending',
  };
  return map[type] || 'QuickTip';
}

export function getProps(video: VideoData): Record<string, any> {
  const baseProps = {
    brandColor: video.brandColor,
    cta: video.cta,
  };

  switch (video.type) {
    case 'Educational':
      return {
        ...baseProps,
        title: video.title,
        hook: video.hook,
        mainPoints: video.mainPoints,
        conclusion: video.conclusion,
      };
    case 'Mythbusting':
      return {
        ...baseProps,
        title: video.title,
        myth: video.myth,
        truth: video.truth,
        explanation: video.explanation,
      };
    case 'QuickTip':
      return {
        ...baseProps,
        tip: video.tip,
        reason: video.reason,
      };
    case 'Trending':
      return {
        ...baseProps,
        title: video.title,
        hook: video.hook,
        scenes: video.scenes,
        trendingFormat: video.trendingFormat,
      };
    default:
      return baseProps;
  }
}
