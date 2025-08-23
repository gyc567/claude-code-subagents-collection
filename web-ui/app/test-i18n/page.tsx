'use client'

import { useLanguage } from '@/contexts/language-context';
import { generateCategoryDisplayName } from '@/lib/category-utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TestI18nPage() {
  const { language, setLanguage, t } = useLanguage();

  const testCategories = [
    'development-architecture',
    'language-specialists', 
    'infrastructure-operations',
    'quality-security',
    'data-ai',
    'specialized-domains',
    'crypto-trading'
  ];

  const commandCategories = [
    'version-control-git',
    'code-analysis-testing',
    'context-loading-priming',
    'documentation-changelogs',
    'project-task-management',
    'ci-deployment',
    'miscellaneous'
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">国际化测试页面</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">语言控制</h2>
          <div className="flex gap-4">
            <Button 
              onClick={() => setLanguage('en')}
              variant={language === 'en' ? 'default' : 'outline'}
            >
              English
            </Button>
            <Button 
              onClick={() => setLanguage('zh')}
              variant={language === 'zh' ? 'default' : 'outline'}
            >
              中文
            </Button>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            当前语言：{language}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>导航翻译测试</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>标题:</strong> {t('common', 'navigation.title')}</p>
              <p><strong>子代理:</strong> {t('common', 'navigation.subagents')}</p>
              <p><strong>命令:</strong> {t('common', 'navigation.commands')}</p>
              <p><strong>MCP服务器:</strong> {t('common', 'navigation.mcpServers')}</p>
              <p><strong>文档:</strong> {t('common', 'navigation.documentation')}</p>
              <p><strong>CLI工具:</strong> {t('common', 'navigation.cliTool')}</p>
              <p><strong>贡献:</strong> {t('common', 'navigation.contribute')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>功能特性翻译</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p><strong>{t('common', 'features.easyInstallation.title')}:</strong></p>
                <p className="text-sm text-muted-foreground">{t('common', 'features.easyInstallation.description')}</p>
              </div>
              <div>
                <p><strong>{t('common', 'features.automaticInvocation.title')}:</strong></p>
                <p className="text-sm text-muted-foreground">{t('common', 'features.automaticInvocation.description')}</p>
              </div>
              <div>
                <p><strong>{t('common', 'features.qualityAssured.title')}:</strong></p>
                <p className="text-sm text-muted-foreground">{t('common', 'features.qualityAssured.description')}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>子代理类别翻译</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {testCategories.map(category => (
                <div key={category}>
                  <strong>{category}:</strong> {generateCategoryDisplayName(category, language, t)}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>命令类别翻译</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {commandCategories.map(category => (
                <div key={category}>
                  <strong>{category}:</strong> {generateCategoryDisplayName(category, language, t)}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>按钮和操作翻译</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                {t('common', 'buttons.copyMarkdown')}
              </Button>
              <Button variant="outline" size="sm">
                {t('common', 'buttons.downloadFile')}
              </Button>
              <Button variant="outline" size="sm">
                {t('common', 'buttons.installWithCli')}
              </Button>
              <Button variant="outline" size="sm">
                {t('common', 'buttons.browseAll')}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>统计数据翻译测试</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>{t('common', 'stats.subagents', { count: 43 })}</p>
            <p>{t('common', 'stats.commands', { count: 39 })}</p>
            <p>{t('common', 'stats.mcpServers', { count: 100 })}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}