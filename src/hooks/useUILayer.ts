import { useEffect, useMemo } from 'react';

export type UILayerLevel = 'base' | 'content' | 'interactive' | 'overlay' | 'modal' | 'top';

interface LayerConfig {
  zIndex: number;
  className: string;
}

const layerConfigs: Record<UILayerLevel, LayerConfig> = {
  base: { zIndex: 0, className: 'layer-base' },
  content: { zIndex: 10, className: 'layer-content' },
  interactive: { zIndex: 100, className: 'layer-interactive' },
  overlay: { zIndex: 1000, className: 'layer-overlay' },
  modal: { zIndex: 10000, className: 'layer-modal' },
  top: { zIndex: 100000, className: 'layer-top' }
};

export const useUILayer = (level: UILayerLevel) => {
  const config = useMemo(() => layerConfigs[level], [level]);

  useEffect(() => {
    // Validate layer usage
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[UILayer] Component using ${level} layer`);
    }
  }, [level]);

  return {
    layerClass: config.className,
    zIndex: config.zIndex,
    level
  };
};

// Higher-order component for layer enforcement
export const withUILayer = (WrappedComponent: React.ComponentType<any>, level: UILayerLevel) => {
  return function WithUILayerComponent(props: any) {
    const { layerClass } = useUILayer(level);
    return (
      <div className={layerClass}>
        <WrappedComponent {...props} />
      </div>
    );
  };
};
