import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Heart, Shield, Info } from 'lucide-react';
import { StepIndicator } from './components/StepIndicator';
import { ComplicationSelector } from './components/ComplicationSelector';
import { MedicalInfoForm } from './components/MedicalInfoForm';
import { ContactsHospitalsForm } from './components/ContactsHospitalsForm';
import { CardPreview } from './components/CardPreview';
import { VisitCounter } from './components/VisitCounter';
import { AboutPage } from './components/AboutPage';
import { downloadAsImage, downloadAsJSON, downloadAsMarkdown } from './utils/downloadUtils';
import { 
  CardConfig, 
  ComplicationConfig, 
  MedicalInfo, 
  AnticoagulationInfo, 
  CurrentMedications,
  EmergencyContact,
  Hospital,
  Doctor,
  StepType 
} from './types';

const initialMedicalInfo: MedicalInfo = {
  name: '',
  age: '',
  bloodType: '',
  idNumber: '',
  mainDiagnosis: '',
  surgeryHistory: '',
  allergies: '',
  otherDiseases: ''
};

const initialAnticoagulation: AnticoagulationInfo = {
  isOnAnticoagulation: false,
  medicationType: '',
  lastTaken: '',
  stopReason: ''
};

const initialCurrentMedications: CurrentMedications = {
  medications: []
};

const stepNames = ['选择并发症', '医疗信息', '联系人医院', '预览下载'];

function App() {
  const [currentView, setCurrentView] = useState<'main' | 'about'>('main');
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedComplications, setSelectedComplications] = useState<ComplicationConfig[]>([]);
  const [medicalInfo, setMedicalInfo] = useState<MedicalInfo>(initialMedicalInfo);
  const [anticoagulation, setAnticoagulation] = useState<AnticoagulationInfo>(initialAnticoagulation);
  const [currentMedications, setCurrentMedications] = useState<CurrentMedications>(initialCurrentMedications);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const handleComplicationToggle = (complicationId: string) => {
    setSelectedComplications(prev => {
      const existing = prev.find(c => c.id === complicationId);
      if (existing) {
        return prev.map(c => 
          c.id === complicationId ? { ...c, enabled: !c.enabled } : c
        );
      } else {
        return [...prev, { id: complicationId, name: '', enabled: true }];
      }
    });
  };

  const getCurrentConfig = (): CardConfig => ({
    complications: selectedComplications,
    medicalInfo,
    anticoagulation,
    currentMedications,
    emergencyContacts,
    hospitals,
    doctors,
    nursingServices: []
  });

  const handleUploadConfig = (config: CardConfig) => {
    setSelectedComplications(config.complications || []);
    setMedicalInfo(config.medicalInfo || initialMedicalInfo);
    setAnticoagulation(config.anticoagulation || initialAnticoagulation);
    setCurrentMedications(config.currentMedications || initialCurrentMedications);
    setEmergencyContacts(config.emergencyContacts || []);
    setHospitals(config.hospitals || []);
    setDoctors(config.doctors || []);
  };

  const handleDownloadImage = async () => {
    const cardElement = document.querySelector('[data-card-preview]') as HTMLElement;
    if (cardElement) {
      try {
        const html2canvas = (await import('html2canvas')).default;
        const canvas = await html2canvas(cardElement, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          width: cardElement.scrollWidth,
          height: cardElement.scrollHeight
        });

        const link = document.createElement('a');
        link.download = `小红卡-${medicalInfo.name || '医疗指引卡'}-${new Date().toLocaleDateString()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (error) {
        console.error('Error generating image:', error);
        alert('生成图片时出现错误，请重试');
      }
    }
  };

  const handleDownloadConfig = () => {
    downloadAsJSON(getCurrentConfig(), `小红卡配置-${medicalInfo.name || '医疗指引卡'}-${new Date().toLocaleDateString()}.json`);
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 0:
        return selectedComplications.some(c => c.enabled);
      case 1:
        return medicalInfo.name && medicalInfo.bloodType;
      case 2:
        return emergencyContacts.length > 0 || hospitals.length > 0;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < stepNames.length - 1 && canProceedToNext()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ComplicationSelector
            selectedComplications={selectedComplications}
            onComplicationToggle={handleComplicationToggle}
          />
        );
      case 1:
        return (
          <MedicalInfoForm
            medicalInfo={medicalInfo}
            anticoagulation={anticoagulation}
            currentMedications={currentMedications}
            onMedicalInfoChange={setMedicalInfo}
            onAnticoagulationChange={setAnticoagulation}
            onCurrentMedicationsChange={setCurrentMedications}
          />
        );
      case 2:
        return (
          <ContactsHospitalsForm
            emergencyContacts={emergencyContacts}
            hospitals={hospitals}
            doctors={doctors}
            onEmergencyContactsChange={setEmergencyContacts}
            onHospitalsChange={setHospitals}
            onDoctorsChange={setDoctors}
          />
        );
      case 3:
        return (
          <CardPreview
            config={getCurrentConfig()}
            onDownloadImage={handleDownloadImage}
            onDownloadConfig={handleDownloadConfig}
            onUploadConfig={handleUploadConfig}
          />
        );
      default:
        return null;
    }
  };

  if (currentView === 'about') {
    return <AboutPage onBack={() => setCurrentView('main')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-red-500 p-2 rounded-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">小红卡生成器</h1>
                <p className="text-sm text-gray-600">肿瘤患者并发症管理指引卡</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('about')}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Info className="w-4 h-4" />
                <span>关于项目</span>
              </button>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>数据本地处理，隐私安全</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Visit Counter */}
        <VisitCounter />

        <StepIndicator
          currentStep={currentStep}
          totalSteps={stepNames.length}
          stepNames={stepNames}
        />

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <div data-card-preview>
            {renderCurrentStep()}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            上一步
          </button>

          <div className="text-sm text-gray-500">
            第 {currentStep + 1} 步，共 {stepNames.length} 步
          </div>

          <button
            onClick={nextStep}
            disabled={currentStep === stepNames.length - 1 || !canProceedToNext()}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentStep === stepNames.length - 1 || !canProceedToNext()
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
          >
            下一步
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        {/* Progress hint */}
        {!canProceedToNext() && currentStep < stepNames.length - 1 && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              {currentStep === 0 && '请至少选择一种需要管理的并发症'}
              {currentStep === 1 && '请填写姓名和血型等基本信息'}
              {currentStep === 2 && '请至少添加一个紧急联系人或医院信息'}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">
              <strong>重要提醒：</strong>本工具仅供参考，不能替代专业医疗建议。紧急情况请立即拨打120或前往最近医院。
            </p>
            <p>
              数据完全在本地处理，不会上传到服务器，保护您的隐私安全。
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;