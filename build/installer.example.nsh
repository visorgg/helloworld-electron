!define REGSVR `$SYSDIR\regsvr32.exe` #= define where RegSrv32 is

!macro customInstall
  Exec `"${REGSVR}" "$INSTDIR\resources\extra_resources\myDLL.DLL"`
!macroend

!macro unregisterFileAssociations
  Exec `"${REGSVR}" /u "$INSTDIR\resources\extra_resources\myDLL.DLL"`
!macroend
