import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Work as WorkIcon } from '@mui/icons-material';
import type { TimelineNode } from './types';

interface ExperienceTimelineProps {
  nodes: TimelineNode[];
  onNodeClick: (nodeId: string) => void;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ nodes, onNodeClick }) => {
  const theme = useTheme();

  const getTypeColor = (type: TimelineNode['type']) => {
    switch (type) {
      case 'full-time':
        return theme.palette.primary.main;
      case 'part-time':
        return theme.palette.secondary.main;
      case 'internship':
        return theme.palette.warning.main;
      case 'contract':
        return theme.palette.info.main;
      case 'freelance':
        return theme.palette.success.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const getTypeBgColor = (type: TimelineNode['type']) => {
    switch (type) {
      case 'full-time':
        return `${theme.palette.primary.main}20`;
      case 'part-time':
        return `${theme.palette.secondary.main}20`;
      case 'internship':
        return `${theme.palette.warning.main}20`;
      case 'contract':
        return `${theme.palette.info.main}20`;
      case 'freelance':
        return `${theme.palette.success.main}20`;
      default:
        return `${theme.palette.primary.main}20`;
    }
  };

  const lineStyles = {
    background: `linear-gradient(90deg, ${theme.palette.divider}, ${theme.palette.primary.main}40, ${theme.palette.divider})`,
  };

  return (
    <Box className="experience-timeline-graph">
      <Box className="timeline-line" sx={lineStyles} />
      <Box className="timeline-nodes-container">
        {nodes.map((node) => (
          <Box
            key={node.id}
            className="timeline-node"
            onClick={() => onNodeClick(node.id)}
            sx={{
              '&:hover': {
                backgroundColor: `${getTypeColor(node.type)}10`,
              },
            }}
          >
            <Box
              className="timeline-node-circle"
              sx={{
                borderColor: getTypeColor(node.type),
                backgroundColor: 'background.paper',
                '&::after': {
                  borderColor: getTypeColor(node.type),
                },
              }}
            >
              {node.logo ? (
                <img src={node.logo} alt={`${node.company} logo`} className="timeline-node-logo" />
              ) : (
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: getTypeBgColor(node.type),
                    borderRadius: 1,
                  }}
                >
                  <WorkIcon sx={{ fontSize: 24, color: getTypeColor(node.type) }} />
                </Box>
              )}
            </Box>
            <Box className="timeline-node-content">
              <Typography className="timeline-node-date" sx={{ color: 'text.secondary' }}>
                {node.date}
              </Typography>
              <Typography className="timeline-node-title" sx={{ color: 'text.primary' }}>
                {node.title}
              </Typography>
              <Typography className="timeline-node-company" sx={{ color: 'text.secondary' }}>
                {node.company}
              </Typography>
              <Typography
                className="timeline-node-type"
                sx={{
                  backgroundColor: getTypeBgColor(node.type),
                  color: getTypeColor(node.type),
                }}
              >
                {node.type.replace('-', ' ')}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
